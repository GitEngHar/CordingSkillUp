## 奨学金管理ツール 通称「奨すけ」
### 構成図
![arch drawio](https://github.com/GitEngHar/CordingSkillUp/assets/119464648/75742d7f-0a32-456b-b6bc-243c64fd4958)

### 活用されている例
![image](https://github.com/GitEngHar/CordingSkillUp/assets/119464648/fcf0e6ea-aeea-47b5-9a4b-0d18a000ca1e)

### できること
#### 奨学金の管理操作を自動化しています
自動化している管理操作
- コマンドのヘルプ機能
- 奨学金返済時の残高更新
- 奨学金返済金から引き下ろし、返済ミス時の返済取り消し
- これまで返済した金額・月数と残りの返済する金額・月数の確認

#### コマンド、使い方を確認したい
`syosuke help`

実行できるコマンド・機能と実行例が表示されます

#### 奨学金の残高を更新したい(返済時の挙動)
`syosuke update <name> <month>`

name には更新したい対象の人物名 を入力
month には一度に更新したい月数 を入力

monthを指定しない場合1月分の残高更新が行われます

#### 奨学金の返済を取り消したい
`syosuke delete <name> <month>`

monthを指定しない場合1月分の残高削除が行われます

#### 奨学金の返済した額・月、返済が必要な額・月を確認したい
`syosuke ls <name>`

