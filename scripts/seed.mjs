import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Parse .env.local manually
const envPath = path.resolve('.env.local');
if (fs.existsSync(envPath)) {
  let envContent = fs.readFileSync(envPath, 'utf8');
  // Remove BOM:
  if (envContent.charCodeAt(0) === 0xFEFF) {
    envContent = envContent.slice(1);
  }
  
  envContent.split(/\r?\n/).forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      process.env[match[1]] = match[2].trim();
    }
  });
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE config in env.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const ROLES = ['admin', 'doctor', 'receptionist', 'patient'];
const PROFILES_PER_ROLE = 10;
const EMAIL_DOMAIN = 'dermaglow.app';

async function seed() {
  console.log('Starting DB seed...');
  let errorCount = 0;
  
  for (const role of ROLES) {
    for (let i = 1; i <= PROFILES_PER_ROLE; i++) {
      const email = `${role}${i}@${EMAIL_DOMAIN}`;
      const fullName = `${role.charAt(0).toUpperCase() + role.slice(1)} User ${i}`;
      const password = `Test1234!`;

      // Check if user already exists based on our script pattern
      const { data: { user }, error: createError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: fullName, role }
      });

      if (createError) {
        if (createError.message.includes('already registered')) {
          console.log(`User ${email} already exists. Skipping.`);
        } else {
          console.error(`Failed to create ${email}: ${createError.message}`);
          errorCount++;
        }
        continue;
      }

      if (user) {
        // Wait a small moment to ensure the database trigger has completed creating the profile record
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Update the profile role (since the trigger defaults every new user to 'patient')
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ role })
          .eq('id', user.id);

        if (updateError) {
          console.error(`Failed to update profile for ${email}: ${updateError.message}`);
          errorCount++;
        } else {
          console.log(`Created profile for ${email} with role '${role}'`);
        }
      }
    }
  }

  console.log(`\nSeeding completed. Errors: ${errorCount}`);
  console.log('\nUse these credentials for testing:');
  console.log('Emails form: role[1-10]@dermaglow.app (e.g. doctor1@dermaglow.app, admin3@dermaglow.app)');
  console.log('Password: Test1234!');
}

seed();
