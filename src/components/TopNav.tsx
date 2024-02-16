// interface TopNavProps {
//     sectionList: { sectionIndex: number, label: string }[];
// };

// function TopNav({ sectionList }: TopNavProps) {
//     return (
//         <>
//             <div className="top-nav">
//                 <SectionButtonGroup>
//                     <Swiper {...SWIPERPROPS_STEPPER} className="top-nav__swiper">
//                         {
//                             sectionList.map(([{ sectionIndex, label }], index) =>
//                                 <SwiperSlide key={subIndex} className="top-nav__swiper">
//                                     <SectionButton value={sectionIndex} index={sectionIndex} label={strings.subTest[subIndex as keyof typeof strings.subTest].label}>
//                                         <PngIcon name={subIndex} />
//                                     </SectionButton>
//                                 </SwiperSlide>
//                             )
//                         }
//                     </Swiper>
//                 </SectionButtonGroup>
//             </div>
//             <div className="top-nav__placeholder" />
//         </>
//     );
// }
// export default TopNav;