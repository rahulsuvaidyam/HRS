export const TotalPrice=(products:any=[],slected:any=[])=>{
        let newProduct:any
        if(slected?.length > 0){
           newProduct =  products.filter((e:any)=> slected.includes(e._id))
        }else{
           newProduct = products
        }
        let totalPrice = 0;
        newProduct.forEach((product: any) => {
          const productPrice = product.product.discounts
          ? Math.ceil(product?.product?.discounts ? Math.ceil((100 - product?.product?.discounts) / 100 * product?.product?.price) * product?.count : product?.product?.price * product?.count)
          : parseFloat(product.product.price) * product.count;
        
         totalPrice += productPrice;
        });
        return totalPrice
}