import { MarkupContent } from 'vscode-languageserver-types';

interface TagCollector {
  (tag: string, documentation: string | MarkupContent): void;
}

export interface Attribute {
  label: string;
  type?: string;
  documentation?: string | MarkupContent;
}

export interface AttributeCollector {
  (attribute: string, type?: string, documentation?: string | MarkupContent): void;
}
interface StandaloneAttribute {
  label: string;
  type?: string;
  documentation?: string | MarkupContent;
}

// Note: cannot items more than 10 for lexical order
// smaller enum value means higher priority
export enum Priority {
  UserCode,
  Library,
  Framework,
  Platform,
}

export interface IHTMLTagProvider {
  getId(): string;
  collectTags(collector: TagCollector): void;
  collectAttributes(tag: string, collector: AttributeCollector): void;
  collectValues(tag: string, attribute: string, collector: (value: string) => void): void;

  /* a prefix for completion's lexical order */
  readonly priority: Priority;
}

export interface ITagSet {
  [tag: string]: HTMLTagSpecification;
}

export class HTMLTagSpecification {
  constructor(public label: string | MarkupContent, public attributes: Attribute[] = []) {}
}

export class WXMLTagSpecification {
  constructor(public label: string | MarkupContent, public attributes: Attribute[] = []) {}
}

export interface IValueSets {
  [tag: string]: string[];
}

export function collectTagsDefault(collector: TagCollector, tagSet: ITagSet): void {
  for (const tag in tagSet) {
    collector(tag, tagSet[tag].label);
  }
}

export function collectAttributesDefault(
  tag: string,
  collector: AttributeCollector,
  tagSet: ITagSet,
  globalAttributes: StandaloneAttribute[]
): void {
  if (tag) {
    let tags = tagSet[tag];
    if (!tags) {
      for (const t in tagSet) {
        if (t.toLowerCase() === tag) {
          tags = tagSet[t];
        }
      }
    }

    if (tags) {
      const attributes = tags.attributes;
      for (const attr of attributes) {
        collector(attr.label, attr.type, attr.documentation);
      }
    }
  }
  globalAttributes.forEach((attr) => {
    collector(attr.label, attr.type, attr.documentation);
  });
}

export function collectValuesDefault(
  tag: string,
  attribute: string,
  collector: (value: string) => void,
  tagSet: ITagSet,
  globalAttributes: StandaloneAttribute[],
  valueSets: IValueSets
): void {
  function processAttributes(attributes: Attribute[]) {
    for (const attr of attributes) {
      const label = attr.label;
      if (label !== attribute || !attr.type) {
        continue;
      }
      const typeInfo = attr.type;
      if (typeInfo === 'v') {
        collector(attribute);
      } else {
        const values = valueSets[typeInfo];
        if (values) {
          values.forEach(collector);
        }
      }
    }
  }
  if (tag) {
    const tags = tagSet[tag];
    if (tags) {
      const attributes = tags.attributes;
      if (attributes) {
        processAttributes(attributes);
      }
    }
  }
  processAttributes(globalAttributes);
}

export function genAttribute(label: string, type?: string, documentation?: string | MarkupContent): Attribute {
  return { label, type, documentation: {
    kind: 'markdown',
    value: documentation as string
  } };
}

export interface Component {
  name: string
  docLink?: string
  since?: string
  desc: string[]
  attrs?: ComponentAttr[]
  authorize?: any
  relateApis?: any[]
  notices?: string[]
  tips?: string[]
  bugs?: string[]
}

export interface ComponentAttrValue {
  value: string
  desc?: string
  since?: string
}

export interface ComponentAttr {
  name: string
  type?: any
  desc?: string[]
  required?: boolean
  since?: string
  defaultValue?: string
  enum?: any[]
  extras?: any[]
  subAttrs?: { equal: string; attrs: ComponentAttr[] }[]
}
