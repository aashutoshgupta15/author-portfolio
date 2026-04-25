import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tbkonfwdspvpazfvdmcr.supabase.co';
const supabaseKey = 'sb_publishable_IG_DzT1fd2kzy7rBndTRcw_7VhTohZP';

export const supabase = createClient(supabaseUrl, supabaseKey);
