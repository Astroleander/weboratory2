const ROUTE_LOADING_FAILED = 5001;

const makeContent = (lang_content: string, code: string|number) => {
  return `${lang_content}\tcode: ${code}`
}

const ZH = {
  Route_Loading_Failed: makeContent('错误，路由加载失败', ROUTE_LOADING_FAILED),
  Route_Empty: '当前列表还没有内容，也许作者咕咕咕了……',
}

const EN = {
  
}

const getLayoutStrings: () => { [x: string]: any } = () => {
  // TODO: all i18n support
  return new Proxy(ZH, {
    get(target, p, receiver) {
      const result = Reflect.get(target, p, receiver);
      if (result) return result;
      return ZH[p] ? ZH[p] : EN[p];
    }
  });
};
export const LayoutStrings = getLayoutStrings();