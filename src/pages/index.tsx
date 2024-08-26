import { AnimatedSubscribeButton } from '@/components/magicui/animated-subscribe-button'
import { CheckIcon, ChevronRightIcon } from 'lucide-react'
import React from 'react'

function Index() {
    return (
        <div>
            <AnimatedSubscribeButton
                buttonColor="#20CC6D"
                buttonTextColor="#ffffff"
                subscribeStatus={false}
                initialText={
                    <span className="group inline-flex items-center text-white">
                        Subscribe{" "}
                        <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 text-white  " />
                    </span>
                }
                changeText={
                    <span className="group inline-flex items-center">
                        <CheckIcon className="mr-2 h-4 w-4 " />
                        Subscribed{" "}
                    </span>
                }
            />
        </div>
    )
}

export default Index
