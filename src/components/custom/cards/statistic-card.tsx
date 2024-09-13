import React from 'react'
import { StatisticCardTypes } from '@/types/cards'
import HyperText from '@/components/magicui/hyper-text'
import NumberTicker from '@/components/magicui/number-ticker'
import ShineBorder from '@/components/magicui/shine-border'

const StatisticCard: React.FC<StatisticCardTypes> = ({ title, firstNumber, secondNumber, twoNumbers = false, iconVisible = false, icon }) => {
    return (
        <ShineBorder  color={'#16423C'} borderWidth={1.5} className="bg-white shadow-md dark:bg-boxdark w-full px-3 py-5 rounded-lg flex flex-col items-center justify-center whitespace-nowrap">
            <HyperText
                className="text-2xl text-black dark:text-white"
                text={title}
            />
            {twoNumbers ? (
                <div className='flex gap-1'>
                    <NumberTicker className='text-2xl' value={firstNumber} />
                    <span className="text-2xl"> / </span>
                    <NumberTicker className='text-2xl' value={secondNumber ?? 0} />
                </div>
            ) : (
                <NumberTicker className='text-2xl' value={firstNumber} />
            )}
        </ShineBorder>
    )
}

export default StatisticCard
