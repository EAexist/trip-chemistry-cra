"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VARIANTS_STAGGER_CHILDREN = exports.VARIANTS_SLIDE_UP = exports.VARIANTS_FADEIN = exports.SWIPER = exports.STAGGER_CHILDREN = exports.SLIDEINUPINVIEW = exports.SLIDEINLEFT_DEALY_1250 = exports.SLIDEINLEFT = exports.SHOW = exports.FILL_UP = exports.FILLIN_1S = exports.FILLIN = exports.FADEIN_VIEWPORT = exports.FADEIN_INVIEW = exports.FADEIN = exports.ANIMATE = void 0;
/* Stagger Children */
const VARIANTS_STAGGER_CHILDREN = exports.VARIANTS_STAGGER_CHILDREN = {
  open: (delayChildren = 0.2) => ({
    transition: {
      staggerChildren: 0.07,
      delayChildren: delayChildren
    }
  }),
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};
const STAGGER_CHILDREN = exports.STAGGER_CHILDREN = {
  initial: "closed",
  animate: "open",
  variants: VARIANTS_STAGGER_CHILDREN
};

/* FADE */
const VARIANTS_FADEIN = exports.VARIANTS_FADEIN = {
  hidden: {
    opacity: 0,
    transition: {
      stiffness: 1000,
      ease: "easeInOut",
      duration: 0.25
    }
  },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: {
      stiffness: 1000,
      ease: "easeInOut",
      duration: 0.5,
      delay: delay
    }
  })
};
const FADEIN = exports.FADEIN = {
  initial: "hidden",
  animate: "visible",
  variants: VARIANTS_FADEIN
};
const FADEIN_VIEWPORT = exports.FADEIN_VIEWPORT = {
  initial: "hidden",
  whileInView: "visible",
  variants: VARIANTS_FADEIN,
  viewport: {
    once: true
  }
};

/* SLIDE */
const VARIANTS_SLIDE_UP = exports.VARIANTS_SLIDE_UP = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: {
        stiffness: 1000,
        velocity: -100
      }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: {
        stiffness: 1000
      }
    }
  }
};
const SLIDEINUPINVIEW = exports.SLIDEINUPINVIEW = {
  initial: {
    opacity: 0,
    translateY: '16px'
  },
  animate: {
    opacity: 1,
    translateY: '0'
  },
  viewport: {
    once: false
  },
  transition: {
    ease: "easeInOut",
    duration: 0.5
  }
};
const SLIDEINLEFT = exports.SLIDEINLEFT = {
  initial: "closed",
  animate: "open",
  variants: {
    open: (direction = 'left') => ({
      x: 0,
      opacity: 1,
      transition: {
        x: {
          stiffness: 1000,
          velocity: (direction === 'right' ? 1 : -1) * 200
        }
      }
    }),
    closed: (direction = 'left') => ({
      x: `${direction === 'right' ? '-' : ''}100%`,
      opacity: 0,
      transition: {
        x: {
          stiffness: 1000
        }
      }
    })
  }
};

// const FADEIN = {
//     initial: { 
//         opacity: 0, 
//     },
//     animate: { 
//         opacity: 1, 
//     },
//     viewport: { 
//         // once: false, 
//     },
//     transition: { 
//         ease: "easeInOut", 
//         duration: 0.75, 
//     },
// };

const FADEIN_INVIEW = exports.FADEIN_INVIEW = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1
  },
  viewport: {
    // once: false, 
  },
  transition: {
    ease: "easeInOut",
    duration: 0.75
  }
};
const VARIANT_FILL = {
  hidden: {
    width: '0%',
    transition: {
      width: {
        stiffness: 1000,
        ease: "easeOut",
        duration: 0.5
      }
    }
  },
  filled: {
    width: '100%',
    transition: {
      width: {
        stiffness: 1000,
        ease: "easeOut",
        duration: 0.5
      }
    }
  }
};
const VARIANT_FILL_UP = {
  hidden: {
    height: '0px',
    transition: {
      height: {
        delay: 0.25,
        stiffness: 1000,
        ease: "linear",
        duration: 0.5
      }
    }
  },
  filled: {
    height: 'fit-content',
    transition: {
      height: {
        delay: 0.25,
        stiffness: 1000,
        ease: "linear",
        duration: 0.5
      }
    }
  }
};
const SHOW = exports.SHOW = {
  transition: {
    duration: 1,
    ease: "easeOut"
  }
};
const ANIMATE = exports.ANIMATE = {
  transition: {
    duration: 2,
    ease: "easeOut"
  }
};
const FILL_UP = exports.FILL_UP = {
  initial: "hidden",
  animate: "filled",
  // exit: "hidden",
  variants: VARIANT_FILL_UP
};
const VARIANT_FILL_1S = {
  hidden: {
    width: '0%',
    transition: {
      width: {
        stiffness: 1000,
        ease: "easeOut",
        duration: 0.75
      }
    }
  },
  filled: {
    width: '100%',
    transition: {
      width: {
        stiffness: 1000,
        ease: "easeOut",
        duration: 0.75,
        delay: 0.5
      }
    }
  }
};
const FILLIN = exports.FILLIN = {
  initial: "hidden",
  animate: "filled",
  exit: "hidden",
  variants: VARIANT_FILL
};
const FILLIN_1S = exports.FILLIN_1S = {
  initial: "hidden",
  animate: "filled",
  exit: "hidden",
  variants: VARIANT_FILL_1S
};
const VARIANTS_SLIDEINLEFT = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      stiffness: 1000,
      ease: "easeInOut",
      duration: 0.75
    }
  },
  closed: {
    opacity: 0,
    x: 50,
    transition: {
      stiffness: 1000,
      ease: "easeInOut",
      duration: 0.75
    }
  }
};
const VARIANTS_SLIDEINLEFT_DELAY_1250 = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      stiffness: 1000,
      ease: "easeInOut",
      duration: 0.75,
      delay: 1.25
    }
  },
  closed: {
    opacity: 0,
    x: 50,
    transition: {
      stiffness: 1000,
      ease: "easeInOut",
      duration: 0.75,
      delay: 1.25
    }
  }
};

// const SLIDEINLEFT = {
//     initial: "closed",
//     animate: "open",
//     exit: "closed",
//     variants: VARIANTS_SLIDEINLEFT,
// };

const SLIDEINLEFT_DEALY_1250 = exports.SLIDEINLEFT_DEALY_1250 = {
  initial: "closed",
  animate: "open",
  exit: "closed",
  variants: VARIANTS_SLIDEINLEFT_DELAY_1250
};
const VARIANTS_SWIPER = {
  enter: isIncrementing => {
    return {
      x: isIncrementing ? '100%' : '-100%',
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: isIncrementing => {
    return {
      zIndex: 0,
      x: isIncrementing ? '-100%' : '100%',
      opacity: 0
    };
  }
};
const SWIPER = exports.SWIPER = {
  variants: VARIANTS_SWIPER,
  initial: "enter",
  animate: "center",
  exit: "exit",
  transition: {
    x: {
      type: "spring",
      duration: 1.25
    },
    opacity: {
      duration: 0.2
    }
  },
  drag: "x",
  dragConstraints: {
    left: 0,
    right: 0
  },
  dragElastic: 1
  // onDragEnd: (e, { offset, velocity }) => {
  //   const swipe = swipePower(offset.x, velocity.x);

  //   if (swipe < -swipeConfidenceThreshold) {
  //     paginate(1);
  //   } else if (swipe > swipeConfidenceThreshold) {
  //     paginate(-1);
  //   }
  // },
};