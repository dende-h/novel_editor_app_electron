import { createClient } from '@supabase/supabase-js';

//supabaseAPI利用のためのクライアント
export const supabase = createClient(
	'https://enjzxtbbcyrptkkutovq.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuanp4dGJiY3lycHRra3V0b3ZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk2MzkyOTYsImV4cCI6MTk5NTIxNTI5Nn0.yRY_ffoWbhi4VOw-ybofPBCaT3Mh6SGxLaj37az_Qxg'
);
