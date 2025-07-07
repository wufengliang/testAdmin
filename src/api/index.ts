/*
 * @Descripttion:
 * @Author: WuFengliang
 * @Date: 2022-06-14 11:08:51
 * @LastEditTime: 2022-06-14 12:03:30
 */
import instance from './instance';

export function getAll() {
  return instance.get('http://www.baidu.com');
}
