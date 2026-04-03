const { createClient } = require('@supabase/supabase-js');

const url = 'https://xcgrimhhlffaekmhhoqg.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjZ3JpbWhobGZmYWVrbWhob3FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxNTI5NzMsImV4cCI6MjA5MDcyODk3M30.GcoA_2LkFAMlm8dBSzmxUxYlQ1Q33KGgNDA64TboGeo';

const supabase = createClient(url, key);

async function testFetch() {
  console.log("Fetching joined data...");
  const { data, error } = await supabase
    .from('appointments')
    .select(`
      *,
      patient:profiles!patient_id(full_name, email, phone),
      services:service_id(name)
    `)
    .in('status', ['pending', 'confirmed']);
    
  console.log("Result:", JSON.stringify(data, null, 2));
  console.log("Error:", error);
}

testFetch();
