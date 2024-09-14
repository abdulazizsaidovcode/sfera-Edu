import React from 'react'
import { StatisticCardTypes } from '@/types/cards'
import HyperText from '@/components/magicui/hyper-text'
import NumberTicker from '@/components/magicui/number-ticker'
import ShineBorder from '@/components/magicui/shine-border'

const StatisticCard: React.FC<StatisticCardTypes> = ({ title, firstNumber, secondNumber, twoNumbers = false, iconVisible = false, icon }) => {
    const displayFirstNumber = firstNumber ?? 0;
    const displaySecondNumber = secondNumber ?? 0;

    return (
        <ShineBorder color={'#16423C'} borderWidth={1.5} className="bg-white shadow-md dark:bg-boxdark w-full px-3 py-5 rounded-lg flex flex-col items-center justify-center whitespace-nowrap">
            <HyperText
                className="text-2xl text-black dark:text-white"
                text={title}
            />
            {twoNumbers ? (
                <div className='flex gap-1'>
                    <p className='text-2xl'>{displayFirstNumber}</p>
                    <span className="text-2xl"> / </span> 
                    <p className='text-2xl'>{displaySecondNumber}</p>
                </div>
            ) : (
                <p className='text-2xl'>{displayFirstNumber}</p> 
            )}
        </ShineBorder>
    )
}

export default StatisticCard
