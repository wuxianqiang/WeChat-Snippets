/* tslint:disable:max-line-length */
import {
  IHTMLTagProvider,
  collectTagsDefault,
  collectAttributesDefault,
  collectValuesDefault,
  genAttribute,
  AttributeCollector,
  Priority,
  HTMLTagSpecification,
} from './common';

const wxJson = require('alipay-json/pay.json');
const u = undefined;

const vueDirectives = [
  genAttribute('a:if', u, '在框架中，使用 `a:if` 来判断是否需要渲染该代码块'),
  genAttribute('a:else', 'v', '也可以用 `a:elif` 和 `a:else` 来添加一个 else 块'),
  genAttribute('a:elif', u, '也可以用 `a:elif` 和 `a:else` 来添加一个 else 块'),
  genAttribute('a:for', u, '在组件上使用 `a:for` 控制属性绑定一个数组，即可使用数组中各项的数据重复渲染该组件'),
  genAttribute('a:for-item', u, '使用 `a:for-item` 可以指定数组当前元素的变量名'),
  genAttribute('a:for-index', u, '使用 `a:for-index` 可以指定数组当前下标的变量名'),
  genAttribute(
    'a:key',
    u,
    '如果列表中项目的位置会动态改变或者有新的项目添加到列表中，并且希望列表中的项目保持自己的特征和状态（如 input 中的输入内容，switch 的选中状态），需要使用 `wx:key` 来指定列表中项目的唯一的标识符'
  ),
  genAttribute('id', u, 'css选择器'),
  genAttribute('class', u, 'css选择器'),
];

export interface IEventSet {
  [eventNames: string]: string;
}

const eventHandlers: IEventSet = {
  touchstart: '手指触摸动作开始',
  touchmove: '手指触摸后移动',
  touchcancel: '手指触摸动作被打断，如来电提醒，弹窗',
  touchend: '手指触摸动作结束',
  tap: '手指触摸后马上离开',
  longpress: '手指触摸后，超过350ms再离开，如果指定了事件回调函数并触发了这个事件，tap事件将不被触发',
  longtap: '手指触摸后，超过350ms再离开',
  transitionend: '会在 WXSS transition 或 wx.createAnimation 动画结束后触发',
  animationstart: '会在一个 WXSS animation 动画开始时触发',
  animationiteration: '会在一个 WXSS animation 一次迭代结束时触发',
  animationend: '会在一个 WXSS animation 动画完成时触发',
  touchforcechange: '在支持 3D Touch 的 iPhone 设备，重按时会触发'
};

function generatorEvent (key: string) {
  for (const eventName in eventHandlers) {
    vueDirectives.push(genAttribute(`${key}${eventName}`, u, eventHandlers[eventName]));
  }
}

generatorEvent('on');
generatorEvent('catch');

const valueSets = {
  transMode: ['out-in', 'in-out'],
  transType: ['transition', 'animation'],
  b: ['true', 'false'],
};

interface Component {
  [prop :string]: {
    tableList: {
      [attr :string]: string[]
    },
    descriptList: string[]
  };
}

interface Tag {
  [key :string]: HTMLTagSpecification;
}

const weixinTags:Tag = {};

(wxJson as Component[]).forEach((component: Component) => {
  for (const key in component) {
    const { tableList, descriptList } = component[key];
    const attrList = [];
    for (const table in tableList) {
      attrList.push(genAttribute(table, u, tableList[table].join('；')));
    }
    weixinTags[key] = new HTMLTagSpecification(
      { kind: 'markdown', value:  descriptList.join('；') },
      attrList
    );
  }
});

export function getAlipayTagProvider(): IHTMLTagProvider {
  return {
    getId: () => 'wxml',
    priority: Priority.Framework,
    collectTags: (collector) => collectTagsDefault(collector, weixinTags),
    collectAttributes: (tag: string, collector: AttributeCollector) => {
      collectAttributesDefault(tag, collector, weixinTags, vueDirectives);
    },
    collectValues: (tag: string, attribute: string, collector: (value: string) => void) => {
      collectValuesDefault(tag, attribute, collector, weixinTags, vueDirectives, valueSets);
    },
  };
}
