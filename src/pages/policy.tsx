import { Heading, Text, VStack } from "@chakra-ui/react";

export default function PrivacyPolicy() {
	return (
		<VStack maxW="800px" mx="auto" px={4} py={8} spacing={8}>
			<Heading as="h1" size="lg">
				Re:terature及びLit:Biteのプライバシーポリシー
			</Heading>
			<VStack align="start" spacing={4}>
				<Text>
					このドキュメントでは、Re:terature及びLit:Biteアプリにおいて個人情報を収集、使用、保護する方法について説明します。
				</Text>
				<Text fontWeight="bold">1. 収集する情報</Text>
				<Text>
					当サイトでは、サムネイル画像、小説、およびペンネームを取得します。それ以外の個人情報は一切取得いたしません。ペンネームは、ユーザーがアプリ内で投稿した小説に表示されます。ペンネームの入力にあたって、ユーザーには実名の入力は必要ありません。ユーザーが入力した小説は、ユーザー自身の端末に保存されます。また、ユーザーが公開設定を行った場合、投稿した小説は他のユーザーに閲覧される可能性があります。
				</Text>
				<Text fontWeight="bold">2. 収集した情報の利用</Text>
				<Text>
					当サイトで取得した情報は、短編小説とサムネイル画像の投稿・閲覧に使用されます。ペンネームは、ユーザーの投稿した小説に表示されます。ペンネームは、他のユーザーが投稿した小説と区別するために使用されます。当サイトは、利用者の個人情報を第三者に提供することはありません。
				</Text>
				<Text fontWeight="bold">3. 情報の保護について</Text>
				<Text>
					当サイトは、取得した情報を厳密に管理し、不正アクセス、漏洩、紛失、破壊などを防止するために必要な措置を講じます。
				</Text>
				<Text fontWeight="bold">4. 免責事項</Text>
				<Text>
					本サイトにおいて提供される情報については、正確性、確実性、適合性、有用性等について一切保証するものではありません。本サイトの利用によって生じたいかなる損害についても、一切責任を負いません。
				</Text>
				<Text fontWeight="bold">5. コンテンツの著作権</Text>
				<Text>
					本サイトに掲載されているコンテンツの著作権は、その提供者に帰属します。本サイトのコンテンツを提供者以外の第三者が無断で転載・複製することを禁じます。
				</Text>

				<Text fontWeight="bold">6. プライバシーポリシーの変更</Text>
				<Text>
					本サイトは、利用者に事前の通知なく、いつでもプライバシーポリシーを変更することができます。変更後のプライバシーポリシーは、本サイトに掲載した時点で効力を発揮します。
				</Text>
				<Text fontWeight="bold">7. 最終更新日</Text>
				<Text>本プライバシーポリシーは2023年4月24日に最終更新されました。</Text>
			</VStack>
		</VStack>
	);
}
