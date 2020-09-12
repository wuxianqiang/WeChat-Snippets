import * as vscode from 'vscode';
import { LanguageClient, WorkspaceEdit } from 'vscode-languageclient';
import { generateGrammarCommandHandler } from './commands/generateGrammarCommand';
import { registerLanguageConfigurations } from './languages';
import { initializeLanguageClient } from './client';
import { join } from 'path';
import {
  setVirtualContents,
  registerVeturTextDocumentProviders,
  generateShowVirtualFileCommand
} from './commands/virtualFileCommand';
import { getGlobalSnippetDir } from './userSnippetDir';
import { generateOpenUserScaffoldSnippetFolderCommand } from './commands/openUserScaffoldSnippetFolderCommand';
const config = vscode.workspace.getConfiguration();
const languages = config.applets.languages
export async function activate(context: vscode.ExtensionContext) {
  const isInsiders = vscode.env.appName.includes('Insiders');
  const globalSnippetDir = getGlobalSnippetDir(isInsiders);

  /**
   * Virtual file display command for debugging template interpolation
   */
  context.subscriptions.push(await registerVeturTextDocumentProviders());

  /**
   * Custom Block Grammar generation command
   */
  context.subscriptions.push(
    vscode.commands.registerCommand('applets.generateGrammar', generateGrammarCommandHandler(context.extensionPath))
  );

  /**
   * Open custom snippet folder
   */
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'applets.openUserScaffoldSnippetFolder',
      generateOpenUserScaffoldSnippetFolderCommand(globalSnippetDir)
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('applets.applyWorkspaceEdits', (args: WorkspaceEdit) => {
      const edit = client.protocol2CodeConverter.asWorkspaceEdit(args)!;
      vscode.workspace.applyEdit(edit);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('applets.chooseTypeScriptRefactoring', (args: any) => {
      client
        .sendRequest<vscode.Command | undefined>('requestCodeActionEdits', args)
        .then(command => command && vscode.commands.executeCommand(command.command, ...command.arguments!));
    })
  );

  registerLanguageConfigurations();

  /**
   * Vue Language Server Initialization
   */

  const serverModule = context.asAbsolutePath(join('server', 'dist', 'vueServerMain.js'));
  const client = initializeLanguageClient(serverModule, globalSnippetDir);
  context.subscriptions.push(client.start());

  client
    .onReady()
    .then(() => {
      registerCustomClientNotificationHandlers(client);
      registerCustomLSPCommands(context, client);
    })
    .catch(e => {
      console.log('Client initialization failed');
    });
  context.subscriptions.push(vscode.languages.registerCompletionItemProvider(['xml', 'wxml', 'axml', 'qml', 'ttml', 'jxml', 'swan'], {
    provideCompletionItems,
    resolveCompletionItem
  }, '1'));
}

function registerCustomClientNotificationHandlers(client: LanguageClient) {
  client.onNotification('$/displayInfo', (msg: string) => {
    vscode.window.showInformationMessage(msg);
  });
  client.onNotification('$/displayWarning', (msg: string) => {
    vscode.window.showWarningMessage(msg);
  });
  client.onNotification('$/displayError', (msg: string) => {
    vscode.window.showErrorMessage(msg);
  });
  client.onNotification('$/showVirtualFile', (virtualFileSource: string, prettySourceMap: string) => {
    setVirtualContents(virtualFileSource, prettySourceMap);
  });
}

function registerCustomLSPCommands(context: vscode.ExtensionContext, client: LanguageClient) {
  context.subscriptions.push(
    vscode.commands.registerCommand('applets.showCorrespondingVirtualFile', generateShowVirtualFileCommand(client))
  );
}
let keys: string[] = []
if (languages === '微信小程序') {
  const list = require('weixin-json/wx.json')
  list.forEach((item: any) => {
    const key = Object.keys(item)[0]
    if (key) {
      keys.push(key)
    }
  })
}
if (languages === '支付宝小程序') {
  const list = require('alipay-json/pay.json')
  list.forEach((item: any) => {
    const key = Object.keys(item)[0]
    if (key) {
      keys.push(key)
    }
  })
}
if (languages === '百度小程序') {
  const list = require('baidu-json/bd.json')
  list.forEach((item: any) => {
    const key = Object.keys(item)[0]
    if (key) {
      keys.push(key)
    }
  })
}
if (languages === 'QQ小程序') {
  const list = require('qq-json/qq.json')
  list.forEach((item: any) => {
    const key = Object.keys(item)[0]
    if (key) {
      keys.push(key)
    }
  })
}
if (languages === '字节小程序') {
  const list = require('bytedance-json/bytedance.json')
  list.forEach((item: any) => {
    const key = Object.keys(item)[0]
    if (key) {
      keys.push(key)
    }
  })
}
if (languages === '京东小程序') {
  const list = require('jd-json/jd.json')
  list.forEach((item: any) => {
    const key = Object.keys(item)[0]
    if (key) {
      keys.push(key)
    }
  })
}

function craeteCompletion (key: string) {
  let item = new vscode.CompletionItem(key, vscode.CompletionItemKind.Property)
  item.detail = '小程序组件'
  item.documentation = `<${key}>|</${key}>`
  item.insertText = new vscode.SnippetString(`<${key}>$1</${key}>`)
  return item
}

// 确定提示的位置
function provideCompletionItems(document: any, position: any) {
  const text = document.getText()
  const tempEnd = text.lastIndexOf('</view>')
  const temp = text.slice(0, tempEnd + 11)
  const pos = document.offsetAt(position)
  if (tempEnd < 0 || pos > tempEnd) {
    return [craeteCompletion('view')]
  }
  const posLeft = temp.slice(0, pos).lastIndexOf('>')
  const posRight = temp.slice(pos, tempEnd + 11).indexOf('<')
  if (posLeft < 0 || posRight < 0) {
    return null
  }
  const rangeLeft = text.slice(posLeft + 1, pos)
  const rangeRight = text.slice(pos, pos + posRight)
  if (rangeLeft.includes('<') || rangeRight.includes('>')) {
    return null
  }
  return keys.map((key) => craeteCompletion(key))
}

function resolveCompletionItem() {
  return null;
}
