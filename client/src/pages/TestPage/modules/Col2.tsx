import React, {memo} from 'react';
import {TgIcon, VkIcon, YoutubeIcon, YtIcon} from "@UI/Icons/Social";
import {EmailAddress, PhoneNumber} from "@UI/Elements/Contacts";
import {Badge, GoldBadge, GreenBadge, PinkBadge, RedBadge} from "@UI/Badges";
import {StandardFilledButton} from "@UI/Buttons";
import {
    BorderedLink,
    ButtonLink,
    FilledArrowLink,
    SecondaryButtonLink,
    SecondaryTextLink,
    TextArrowLink,
    TextLink
} from "@UI/Links";
import {ThreeDotMenu} from "@components/ThreeDotMenu";
import {BiEditAlt} from "react-icons/bi";
import {BsEye, BsFillTrashFill, BsTrashFill} from "react-icons/bs";

interface RowProps {

}

export const Col2: React.FC<RowProps> = memo(({}) => {
    return (
        <div className="flex items-center justify-center flex-col gap-8">

           <div className="flex gap-2 max-w-xs w-96">
               <VkIcon />
               <div className="flex flex-col justify-between ">
                   <YtIcon className="w-10 h-10"/>
                   <TgIcon className="w-10 h-10"/>
               </div>
               <div className="flex flex-col justify-between ">
                   <YoutubeIcon className="" />
                   <YoutubeIcon className="" dark />
               </div>
           </div>

            <div>
                <PhoneNumber />
                <EmailAddress />
            </div>

            <div className="flex flex-wrap gap-3 bg-white w-full rounded-xl p-3">
                <Badge>Standard</Badge>
                <GreenBadge>Good</GreenBadge>
                <PinkBadge>Great</PinkBadge>
                <RedBadge>Bad</RedBadge>
                <GoldBadge>Brilliant</GoldBadge>
            </div>

            <div className="flex gap-3">
                <FilledArrowLink to="/test">Arrow link</FilledArrowLink>
                <TextArrowLink to="https://colorbit.ru" target="_blank">Играть</TextArrowLink>
            </div>

            <div className="flex gap-3">
                <ButtonLink to="/test">ButtonLink</ButtonLink>
                <SecondaryButtonLink to="https://vk.com/colorbit.mining" target="_blank">SecondaryButtonLink</SecondaryButtonLink>
            </div>

            <div className="flex gap-3">
                <TextLink to="/" >Обычная ссылка</TextLink>
                <SecondaryTextLink to="/">Ссылка в Сибирь</SecondaryTextLink>
            </div>

            <div className="flex gap-3 rounded-xl bg-white w-full py-3 px-3">
                <BorderedLink to="/">Learn more</BorderedLink>
            </div>

            <div className="flex gap-3 w-full">
                <div className="flex-1 flex justify-between items-center p-3 rounded-xl bg-white shadow-lg">
                    <div className="text-medium">Items</div>

                    <ThreeDotMenu
                        header="Управление"
                        items={[
                            {
                                text: 'Просмотр',
                                Icon: BsEye,
                            },
                            {
                                text: 'Редактировать',
                                Icon: BiEditAlt,
                            },
                            {
                                text: 'Удалить',
                                Icon: BsTrashFill,
                                className: 'hover:bg-red-500'
                            },
                        ]}
                    />
                </div>

                <div className="flex-1 flex justify-between items-center p-3 rounded-xl bg-white shadow-lg">
                    <div className="text-medium">Groups</div>

                    <ThreeDotMenu
                        groups={[
                            [
                                {text: 'group 1', onClick: () => alert("I'm one"),},
                                {text: 'group 1'}
                            ],
                            [{text: 'group 2', disabled: true}],
                            [
                                {
                                    text: 'click me',
                                    onClick: () => alert("Stop clicking on me!!!"),
                                    Icon: BsFillTrashFill,
                                }
                            ]
                        ]}
                    />
                </div>
            </div>

        </div>
    );
});