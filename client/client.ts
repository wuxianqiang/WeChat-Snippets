import * as vscode from 'vscode';
import {
  LanguageClient,
  RevealOutputChannelOn,
  ServerOptions,
  TransportKind,
  LanguageClientOptions,
} from 'vscode-languageclient';
import { resolve } from 'path';
import { existsSync } from 'fs';

export function initializeLanguageClient(vlsModulePath: string, globalSnippetDir: string): LanguageClient {
  const debugOptions = { execArgv: ['--nolazy', '--inspect=6005'] };

  const documentSelector = ['xml', 'wxml', 'axml', 'qml', 'ttml', 'jxml', 'swan'];
  const config = vscode.workspace.getConfiguration();

  let serverPath;

  const devVlsPackagePath = config.get('applets.dev.vlsPath', '');
  if (devVlsPackagePath && devVlsPackagePath !== '' && existsSync(devVlsPackagePath)) {
    serverPath = resolve(devVlsPackagePath, 'dist/vueServerMain.js');
  } else {
    serverPath = vlsModulePath;
  }

  const runExecArgv: string[] = [];
  const vlsPort = config.get('applets.dev.vlsPort');
  if (vlsPort !== -1) {
    runExecArgv.push(`--inspect=${vlsPort}`);
    console.log(`Will launch VLS in port: ${vlsPort}`);
  }

  const serverOptions: ServerOptions = {
    run: { module: serverPath, transport: TransportKind.ipc, options: { execArgv: runExecArgv } },
    debug: { module: serverPath, transport: TransportKind.ipc, options: debugOptions },
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector,
    synchronize: {
      configurationSection: [
        // 'vetur',
        'sass',
        'emmet',
        'html',
        'css',
        'javascript',
        'typescript',
        'prettier',
        'stylusSupremacy',
        'applets'
      ],
      fileEvents: vscode.workspace.createFileSystemWatcher('{**/*.js,**/*.ts}', false, false, true),
    },
    initializationOptions: {
      config,
      globalSnippetDir,
    },
    revealOutputChannelOn: RevealOutputChannelOn.Never,
  };

  return new LanguageClient('applets', 'Applets Language Server', serverOptions, clientOptions);
}
