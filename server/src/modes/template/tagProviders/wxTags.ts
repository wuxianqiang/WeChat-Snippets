/* tslint:disable:max-line-length */
import {
  HTMLTagSpecification,
  IHTMLTagProvider,
  collectTagsDefault,
  collectAttributesDefault,
  collectValuesDefault,
  genAttribute,
  AttributeCollector,
  Priority,
} from './common';
import wxJson from './wx';

const u = undefined;

const vueDirectives = [
  genAttribute('wx:if', u, '在框架中，使用 `wx:if` 来判断是否需要渲染该代码块'),
  genAttribute('wx:else', 'wx', '也可以用 `wx:elif` 和 `wx:else` 来添加一个 else 块'),
  genAttribute('wx:elif', u, '也可以用 `wx:elif` 和 `wx:else` 来添加一个 else 块'),
  genAttribute('wx:for', u, '在组件上使用 `wx:for` 控制属性绑定一个数组，即可使用数组中各项的数据重复渲染该组件'),
  genAttribute('wx:for-item', 'wx', '使用 `wx:for-item` 可以指定数组当前元素的变量名'),
  genAttribute('wx:for-index', 'wx', '使用 `wx:for-index` 可以指定数组当前下标的变量名'),
  genAttribute(
    'wx:key',
    'wx',
    '如果列表中项目的位置会动态改变或者有新的项目添加到列表中，并且希望列表中的项目保持自己的特征和状态（如 input 中的输入内容，switch 的选中状态），需要使用 `wx:key` 来指定列表中项目的唯一的标识符'
  ),
];

const valueSets = {
  transMode: ['out-in', 'in-out'],
  transType: ['transition', 'animation'],
  b: ['true', 'false'],
};

const wxTags: any = {};
wxJson.forEach((comp: any) => {
  wxTags[comp.name] = new HTMLTagSpecification(
    comp.desc ? comp.desc.join() : '',
    comp.attrs
      ? comp.attrs.map((t: { name: string; desc?: string[] }) => genAttribute(t.name, u, t.desc ? t.desc.join() : ''))
      : []
  );
});

export function getWXMLTagProvider(): IHTMLTagProvider {
  return {
    getId: () => 'wxml',
    priority: Priority.Framework,
    collectTags: (collector) => collectTagsDefault(collector, wxTags),
    collectAttributes: (tag: string, collector: AttributeCollector) => {
      collectAttributesDefault(tag, collector, wxTags, vueDirectives);
    },
    collectValues: (tag: string, attribute: string, collector: (value: string) => void) => {
      collectValuesDefault(tag, attribute, collector, wxTags, vueDirectives, valueSets);
    },
  };
}
