export default class LocalStorageHelper {
  static getClassName(): string | null {
    return window.localStorage.getItem('className');
  }

  static setClassName(className: string): void {
    return window.localStorage.setItem('className', className);
  }
}
