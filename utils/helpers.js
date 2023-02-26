const Helper = {
    filterSkill : async (array,filterArray) => {
        return await array.filter(({id}) => filterArray.includes(id))  
    }
}



export default Helper
