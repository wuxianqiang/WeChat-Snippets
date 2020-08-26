# WeChat Snippets for Visual Studio Code

> ⚠️ 注意：请先安装Vetur插件和Prettier插件再安装此插件


## Features

- Syntax-highlighting
- 代码高亮
- Snippet
- 代码片断
- Emmet
- 代码提示
- Linting / Error Checking
- Formatting
- 代码格式化
- Auto Completion
- 自动补全

This extension adds WeChat Snippets into Visual Studio Code.

这个插件基于最新的微信小程序 API 添加了Code Snippets。

### It looks like:
![logo](/asset/demo.png)



### Snippets
Including most of the API of WeChat. You can type `w`, choose `wx:if`, and press ENTER, then `wx:if=""` appear on the screen.

插件的 Snippets 如下表格所示，比如你可以键入 `w` 然后按上下键选中 `wx:if` 再按Enter键，就输入了`wx:if=""`了。



<br />

| Prefix | directives Snippet Content |
| ------ | ------------ |
| `wx:if` | `wx:if=""` |
| `wx:else` | `wx:else` |
| `wx:elif` | `wx:elif=""` |
| `wx:for` | `wx:for=""` |
| `wx:for-item` | `wx:for-item=""` |
| `wx:for-index` | `wx:for-index=""` |
| `wx:key` | `wx:key=""` |


<br />

| Prefix | HTML Snippet Content |
| ------ | ------------ |
| `coverImage` | `<cover-image></cover-image>`|
| `coverView` | `<cover-view></cover-view>`|
| `matchMedia` | `<match-media></match-media>`|
| `movableArea` | `<movable-area></movable-area`|
| `movableView` | `<movable-view></movable-view`|
| `scrollView` | `<scroll-view></scroll-view`|
| `swiper` | `<swiper></swiper>`|
| `swiperItem` | `<swiper-item></swiper-item>`|
| `view` | `<view></view>`|
| `icon` | `<icon></icon>`|
| `progress` | `<progress></progress>`|
| `richText` | `<rich-text></rich-text>`|
| `text` | `<text></text>`|
| `button` | `<button></button>`|
| `checkbox` | `<checkbox></checkbox>`|
| `checkboxGroup` | `<checkbox-group></checkbox-group>`|
| `editor` | `<editor></editor>`|
| `form` | `<form></form>`|
| `input` | `<input></input>`|
| `label` | `<label></label>`|
| `picker` | `<picker></picker>`|
| `pickerView` | `<picker-view></picker-view>`|
| `pickerViewColumn` | `<picker-view-column></picker-view-column>`|
| `radio` | `<radio></radio>`|
| `radio-group` | `<radio-group></radio-group>`|
| `slider` | `<slider></slider>`|
| `switch` | `<switch></switch>`|
| `functionalPageNavigator` | `<functional-page-navigator></functional-page-navigator>`|
| `navigator` | `<navigator></navigator>`|
| `audio` | `<audio></audio>`|
| `camera` | `<camera></camera>`|
| `image` | `<image></image>`|
| `livePlayer` | `<live-player></live-player>`|
| `livePusher` | `<live-pusher></live-pusher>`|
| `video` | `<video></video>`|
| `voip-room` | `<voip-room></voip-room>`|
| `map` | `<map></map>`|
| `canvas` | `<canvas></canvas>`|
| `ad` | `<ad></ad>`|
| `officialAccount` | `<official-account></official-account>`|
| `openData` | `<open-data></open-data>`|
| `webView` | `<web-view></web-view>`|
| `navigationBar"` | `<navigation-bar"></navigation-bar">`|
| `pageMeta` | `<page-meta></page-meta>`|
| `progress` | `<progress></progress>`|
| `pages` | `pages: []` |

<br />



### Supported languages
* wxml(.wxml)微信小程序
* axml(.axml)支付宝小程序
* qml(.qml)QQ小程序
* ttml(.ttml)头条小程序
* jxml(.jxml)京东小程序
* swan(.swan)百度小程序

> 微信小程序的JS由 `@types/wechat-miniprogram` 提供支持


### Issues
Submit the [issues](https://github.com/wuxianqiang/WeChat-Snippets/issues) if you find any bug or have any suggestion.

### Contribution
Fork the [repo](https://github.com/wuxianqiang/WeChat-Snippets) and submit pull requests.

##### 2020/07/18 (0.0.1)
* Add code snippets

##### 2020/07/18 (0.0.2)
* Update readme
