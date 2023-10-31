import type { FC } from 'react';

interface CartProps { }

const Cart: FC<CartProps> = () => {
  const products = [
    {
      id: 1,
      name: 'Throwback Hip Bag',
      href: '#',
      color: 'Salmon',
      price: '$90.00',
      quantity: 1,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
      imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
      id: 2,
      name: 'Medium Stuff Satchel',
      href: '#',
      color: 'Blue',
      price: '$32.00',
      quantity: 1,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
      imageAlt:
        'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
   
    // More products...
  ]
  return (
    <>
      <div className="pt-12 lg:pt-14 w-full h-full px-0 lg:px-8 bg-gray-100">
        <div className="flex flex-col lg:flex-row gap-3 h-full lg:pt-4">
          <div className="w-full lg:w-3/5 overflow-y-scroll scrollbar-none h-full bg-white border lg:rounded-lg relative">
            <div className="flow-root p-3">
              <ul  className="-my-6 divide-y divide-gray-200">
                {products.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={product.href}>{product.name}</a>
                          </h3>
                          <p className="ml-4">{product.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">Qty {product.quantity}</p>

                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {/* price mobile */}
            <div className="w-full lg:w-2/5 mt-4 h-3/5 border bg-white block lg:hidden">
              <div className="w-full py-4 px-4 border-b font-semibold text-gray-700">PRICE DETAILS</div>
            </div>
            <div className="sticky bottom-14 w-full bg-gray-50 h-14 flex items-center justify-end px-4">
               <button className='border px-8 py-2 bg-blue-500 text-white font-medium'>Place Order</button>
            </div>
            {/*  */}
          </div>
          <div className="w-full hidden lg:block lg:w-2/5 h-3/5 border bg-white ">
            <div className="w-full py-4 px-4 border-b font-semibold text-gray-700">PRICE DETAILS</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
