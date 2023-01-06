// import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
// import { getSupabase } from "../utils/supabase";


const Index = ({ user, note }) => {
	
	return (
		<>
		 	<p>へろーわーるど</p>
		</>
	);
};
//supabaseのデータ取得とAuth0の認証
// export const getServerSideProps = withPageAuthRequired({
// 	async getServerSideProps({ req, res }) {
// 		const {
// 			user: { accessToken }
// 		} = getSession(req, res);

// 		const supabase = getSupabase(accessToken);

// 		const { data: note } = await supabase.from("note").select("*").order("created_at", { ascending: true });

// 		return {
// 			props: { note }
// 		};
// 	}
// });

export default Index;
