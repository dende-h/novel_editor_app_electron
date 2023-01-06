### 使い始めるとき

- プロジェクトを始めるディレクトリ上で`git clone`します。

```
git clone [雛形となるリポジトリのURL] .　←最後に"."をつけるとリポジトリの中身だけcloneされる
```

- 一度`git remote -v`コマンドでリモートの追跡対象を確認

```
git remote -v

origin  https://github.com/dende-h/[雛形のリポジトリ名].git (fetch)
origin  https://github.com/dende-h/[雛型のリポジトリ名].git (push)
```

- GitHubに新しいプロジェクトのリポジトリを作ってそこと連携する

```
git remote set-url origin [新しいリポジトリのURL]

git remote -v

origin  https://github.com/dende-h/[新しいリポジトリ名].git (fetch)
origin  https://github.com/dende-h/[新しいリポジトリ名].git (push)

こうなればOK
```

- 最後に`git pull origin`を忘れずに

```
git pull origin
```
