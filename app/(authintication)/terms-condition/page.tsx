import CommonDetails from '@/components/common/commonDetails';
import React from 'react';
import { IoMdArrowDroprightCircle } from 'react-icons/io';

const data = [
  {
    icon: IoMdArrowDroprightCircle,
    text: 'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  },
  {
    icon: IoMdArrowDroprightCircle,
    text: 'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  },
  {
    icon: IoMdArrowDroprightCircle,
    text: 'we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue;.',
  },
  {
    icon: IoMdArrowDroprightCircle,
    text: 'the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection.',
  },
  {
    icon: IoMdArrowDroprightCircle,
    text: 'officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis .',
  },
  {
    icon: IoMdArrowDroprightCircle,
    text: 'the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection.',
  },
  {
    icon: IoMdArrowDroprightCircle,
    text: 'officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus .',
  },
  {
    icon: IoMdArrowDroprightCircle,
    text: 'the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection',
  },
  {
    icon: IoMdArrowDroprightCircle,
    text: 'the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection.',
  },
  {
    icon: IoMdArrowDroprightCircle,
    text: 'officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus .',
  },
];

const Page = () => {
  return (
    <div>

    <div className="px-20 pt-20 text-md text-light text-slate-700">
      {data.map((item, index) => (
        <div key={index} className="flex justify-start gap-2 mb-4">
          <item.icon className="h-8 w-8 text-red-600" />
          <p className="text-md font-light text-slate-700">{item.text}</p>
        </div>
      ))}
    </div>
    <CommonDetails/>

    </div>
  );
};

export default Page;
