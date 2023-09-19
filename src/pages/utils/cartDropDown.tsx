
import { CartButton, ContentMenu, ImageContainer, ItemCartMenu, PriceContainer } from '@/src/styles/utils/cartDropdown';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Bag } from 'phosphor-react';
import Image from "next/image"
import { useShoppingCart } from 'use-shopping-cart';

import { CartEntry as ICartEntry, formatCurrencyString } from 'use-shopping-cart/core';
import { useState } from 'react';
import axios from 'axios';
import { stripe } from '@/src/lib/stripe';
import { Player } from '@lottiefiles/react-lottie-player';






function CartEntry({ entry }: { entry: ICartEntry }) {
    return (
        <ItemCartMenu key={entry.id}>
            <ImageContainer>
                <Image src={entry.image ?? ''} alt='' width={90} height={90} priority={true} />
            </ImageContainer>

            <PriceContainer>
                <p>{entry.name}</p>

                <span>{formatCurrencyString({ value: entry.price, currency: 'BRL' })}
                    <p>x{entry.quantity}</p>
                </span>

            </PriceContainer>

        </ItemCartMenu>

    )
}

export default function CartMenu() {

    const { cartDetails, formattedTotalPrice, clearCart, redirectToCheckout, cartCount } = useShoppingCart();

    const lineItens = Object.values(cartDetails ?? {}).map((product) => (
        {
            currency: 'BRL',
            price: product.defaultPriceId,
            quantity: product.quantity

        }

    ));

    const cartEntries = Object.values(cartDetails ?? {}).map((entry) => (
        <CartEntry entry={entry} key={entry.id} />
    ))

    const [isCreatingCheckout, setIsCreatingCheckout] = useState(false)






    async function handleCheckout() {


        try {
            setIsCreatingCheckout(true)
            const response = await axios.post('/api/checkout', { products: lineItens, })
            const CarCheckoutUrl = response.data



            window.location.href = CarCheckoutUrl.checkoutUrl


        } catch (error) {
            alert('Ocorreu um erro ao criar a sessão de checkout.');
        } finally {
            setIsCreatingCheckout(false);
        }
    }
    if (cartCount != 0) {

        return (
            <>

                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>

                        <CartButton>
                            <Bag size={24} />
                            <span>{cartCount}</span>
                        </CartButton>

                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                        <ContentMenu sideOffset={20}>
                            <p>
                                Seu Carrinho

                            </p>
                            <>

                                {cartEntries}

                            </>
                            <span>Total: {formattedTotalPrice}</span>


                            <button onClick={clearCart}>Esvaziar Carrinho</button>
                            <button onClick={handleCheckout}>Finalizar Compra</button>


                        </ContentMenu>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>

            </>
        )
    } else {
        return (
            <>

                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>

                        <CartButton>
                            <Bag size={24} />
                            <span>{cartCount}</span>
                        </CartButton>

                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                        <ContentMenu sideOffset={20}>
                            <p>
                                Seu Carrinho
                            </p>

                            <Player
                                autoplay
                                loop
                                src="https://assets5.lottiefiles.com/packages/lf20_qh5z2fdq.json"
                                style={{ height: '300px', width: '300px' }}
                            >
                                
                            </Player>
                            <span>O carrinho está vazio</span>

                        </ContentMenu>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>

            </>
        )
    }




}

