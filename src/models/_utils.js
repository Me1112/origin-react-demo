/**
 * actionMakerBySubKey
 * 生成save 类型的maker
 * @param subKey
 * @return {function(*):{subKey:*,payload:*,type:string}}
 */


export const actionMakerBySubKey = (type,subKey)=>payload=>({
    type,
    subKey,
    payload
})