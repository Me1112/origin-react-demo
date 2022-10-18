/**
 * 公用的reduces
 */

import produce from 'immer';
import cloneDeep from 'lodash/cloneDeep';

export default {
    save: produce((state,{subkey,payload})=>{
        const targetState = subkey?state[subkey]:state;
        targetState && Object.assign(targetState,payload);
    }),
    // 新增
    addListItem:produce((state,{payload})=>{
        const {dataKey,item={}}=payload;
        const data = state[dataKey]||[];
        const list = data?.list??data
        list.push({...item})

    }),
    // 更新
    updateListItemByKey: produce((state,{payload})=>{
        const {dataKey,item:originItem={},uuidKey='id'}=payload;
        let data = state[dataKey] || [];
        const item = cloneDeep(originItem);
        if(Array.isArray(dataKey)){
            data = dataKey.reduce((a,key)=>a[key],state)
        }
        const list = data?.list??data;
        if (Array.isArray(item)) {
            for (const[index, oldData] of list.entries()) {
              let i = 0;
              let l = item.length;
              while (i < l) {
                const newData = item[i];
                if (newData[uuidKey] === oldData[uuidKey]) {
                  list[index] = newData;
                  item.splice(i, 1);
                  break;
                } else {
                  i++;
                }
              }
              if (!item.length) break;
            }
          } else {
            const findValue = list.find(d => d[uuidKey] === item[uuidKey]);
            findValue && Object.assign(findValue, { ...item });
          }
    }),
    // 删除
    removeListItemByKey: produce((state,{payload})=>{
        const {dataKey,item='',uuidKey='id'}=payload;
        const data = state[dataKey]||[];
        const list = data?.list ?? data;
        if(Array.isArray(item)){
            const newList =  list.filter(d=>!~item.indexOf(d[uuidKey]))
            data.list?(data.list=newList):(state[dataKey]=newList)
        }else {
            const findIndex = list.findIndex(d=>d[uuidKey]===item)
            !!~findIndex && list.splice(findIndex, 1)
        }
    })

}