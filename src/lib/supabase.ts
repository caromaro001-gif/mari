import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://skyhucltbzsghzezkjcr.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEzNDkyZjIyLTYxZjMtNGI5NC1hNzRiLWRiNTkzM2QxODFiNyJ9.eyJwcm9qZWN0SWQiOiJza3lodWNsdGJ6c2doemV6a2pjciIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzgyODI5OTM5LCJleHAiOjIwOTgxODk5MzksImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.8jXfthz2waTKWUERF_a9yM6vLvRhKvs2UAygAdxtab0';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };