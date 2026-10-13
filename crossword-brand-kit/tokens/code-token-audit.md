# Token audit — r
Scanned **73** source files under `app components modules lib`.
## Signals
- Distinct hex colours: **77** (top are the real palette; the long tail is debt)
- `rounded-*` total uses: **51** → a rounded system; check which radii are intentional
- Distinct easings: **12** → multiple motion personalities; candidates to consolidate
- Arbitrary inline colours (`bg-[#…]` etc.): **104** → each should become a token
- `transition` (bare, all-properties) risk: check the `transition` table below for unnamed-property transitions

## Colours (top 50)
| value | count |
|---|---|
| `#040404` | 12 |
| `#fff9e9` | 10 |
| `#e0be60` | 7 |
| `#ddd` | 6 |
| `#ffb657` | 6 |
| `#f3e9d4` | 5 |
| `#33322f` | 5 |
| `#000` | 4 |
| `#462160` | 4 |
| `#00331a` | 4 |
| `#b7ae9a` | 3 |
| `#efe9db` | 3 |
| `#fef8ea` | 3 |
| `#6e6470` | 3 |
| `#2a2622` | 3 |
| `#121212` | 3 |
| `#dfe3d2` | 3 |
| `#fff9ea` | 2 |
| `#7d0034` | 2 |
| `#6c2332` | 2 |
| `#766640` | 2 |
| `#171717` | 2 |
| `#9b9b9b` | 2 |
| `#383838` | 2 |
| `#606060` | 2 |
| `#d2cbba` | 2 |
| `#002916` | 2 |
| `#f9f4eb` | 2 |
| `#161719` | 2 |
| `#eedcc2` | 2 |
| `#e6ded2` | 2 |
| `#dccbbc` | 2 |
| `#ffb6575c` | 2 |
| `#fdf4de` | 2 |
| `#141414` | 1 |
| `#f7c849` | 1 |
| `#faedd4` | 1 |
| `#faecd4` | 1 |
| `#e8dec1` | 1 |
| `#cfb8bb` | 1 |
| `#d6d1c6` | 1 |
| `#b8b8b8` | 1 |
| `#646464` | 1 |
| `#66012b` | 1 |
| `#714d11` | 1 |
| `#b4ab9b` | 1 |
| `#5c5c5c` | 1 |
| `#fef9ec` | 1 |
| `#c89f57` | 1 |
| `#fff8e8` | 1 |

## Border radius
| value | count |
|---|---|
| `rounded-full` | 8 |
| `rounded-[12.701px]` | 5 |
| `rounded-lg` | 3 |
| `rounded` | 2 |
| `rounded-[9.13px]` | 2 |
| `rounded-[8.105px]` | 2 |
| `rounded-[33.333px]` | 2 |
| `rounded-[14.701px]` | 2 |
| `rounded-[15.831px]` | 2 |
| `rounded-[12.904px]` | 2 |
| `rounded-[4.301px]` | 2 |
| `rounded-[12px]` | 2 |
| `rounded-[12.11px]` | 2 |
| `rounded-[4.868px]` | 1 |
| `rounded-[4.565px]` | 1 |
| `rounded-[2.159px]` | 1 |
| `rounded-[6.079px]` | 1 |
| `rounded-[8.642px]` | 1 |
| `rounded-[37.843px]` | 1 |
| `rounded-[6px]` | 1 |
| `rounded-[28px]` | 1 |
| `rounded-[18.093px]` | 1 |
| `rounded-[13.57px]` | 1 |
| `rounded-[8.073px]` | 1 |
| `rounded-[4px]` | 1 |
| `rounded-[58.07px]` | 1 |
| `rounded-[6.452px]` | 1 |
| `rounded-[2px]` | 1 |

## Durations
| value | count |
|---|---|
| `duration-300` | 11 |
| `duration-500` | 6 |
| `duration-200` | 1 |
| `duration-[330ms]` | 1 |
| `duration-450` | 1 |
| `330ms` | 1 |

## Easings
| value | count |
|---|---|
| `ease-out` | 8 |
| `ease-[cubic-bezier(0.25,1,0.5,1)]` | 2 |
| `ease-[ease]` | 2 |
| `cubic-bezier(0.25,1,0.5,1)` | 2 |
| `ease-out-quart` | 1 |
| `ease-in` | 1 |
| `ease-in-out-cubic` | 1 |
| `ease-out-cubic` | 1 |
| `ease-out-quad` | 1 |
| `cubic-bezier(.645, .045, .355, 1)` | 1 |
| `cubic-bezier(.215, .61, .355, 1)` | 1 |
| `cubic-bezier(.25, .46, .45, .94)` | 1 |

## Letter-spacing
| value | count |
|---|---|
| `tracking-[-0.48px]` | 10 |
| `tracking-[-0.32px]` | 10 |
| `tracking-[-0.04em]` | 8 |
| `tracking-[-3px]` | 8 |
| `tracking-[-2.5px]` | 6 |
| `tracking-[-0.28px]` | 5 |
| `tracking-[-0.05em]` | 5 |
| `tracking-[-0.0681px]` | 5 |
| `tracking-[1.44px]` | 3 |
| `tracking-[-0.36px]` | 3 |
| `tracking-[-0.56px]` | 2 |
| `tracking-[-3.5538px]` | 2 |
| `tracking-[4.1px]` | 2 |
| `tracking-[-4.1px]` | 2 |
| `tracking-[-0.96px]` | 2 |
| `tracking-[-2.4552px]` | 1 |
| `tracking-[-2.9555px]` | 1 |
| `tracking-[-1.0741px]` | 1 |
| `tracking-[0.0911px]` | 1 |
| `tracking-[-0.06em]` | 1 |
| `tracking-[0.05em]` | 1 |
| `tracking-[0.3042px]` | 1 |
| `tracking-[-0.6084px]` | 1 |
| `tracking-[-0.0974px]` | 1 |
| `tracking-[-0.1217px]` | 1 |
| `tracking-[-0.1616px]` | 1 |
| `tracking-[-0.0749px]` | 1 |
| `tracking-[-1.7792px]` | 1 |
| `tracking-[-0.8px]` | 1 |
| `tracking-[-0.42px]` | 1 |
| `tracking-[-0.54px]` | 1 |
| `tracking-[-2.4px]` | 1 |
| `tracking-[-1.1px]` | 1 |
| `tracking-[0.12px]` | 1 |
| `tracking-[3.85px]` | 1 |
| `tracking-[-0.1427px]` | 1 |
| `tracking-[0.117px]` | 1 |
| `tracking-[-1.0006px]` | 1 |
| `tracking-[0.0892px]` | 1 |
| `tracking-[-0.4904px]` | 1 |

## Shadows
| value | count |
|---|---|
| `shadow-sm` | 3 |
| `shadow-[0px_1px_1px_rgba(0,0,0,0.11)]` | 2 |
| `shadow-lg` | 2 |
| `shadow-[inset_0px_0px_20px_0px_rgba(108,35,50,0.45)]` | 2 |
| `shadow-[0px_1px_2px_rgba(0,0,0,0.11)]` | 1 |
| `shadow-[inset_0_0_0_0.5px_#b7ae9a]` | 1 |
| `shadow-[inset_1px_0_0_rgba(113,77,17,0.25),inset_-1px_0_0_rgba(113,77,17,0.25),0_-0.5252cqw_2.1007cqw_rgba(0,0,0,0.12)]` | 1 |
| `shadow-[0px_4.234px_4.34px_rgba(0,0,0,0.25)]` | 1 |
| `shadow-[inset_0_-1px_0_#ddd]` | 1 |
| `shadow-[inset_1px_0_0_#ddd,inset_-1px_0_0_#ddd,inset_0_1px_0_#ddd]` | 1 |
| `shadow-[0_0_0_0.55px_#efe9db,0_0_0_1.1px_#ffb657]` | 1 |
| `shadow-[0_0_0_0.6875px_#00000030]` | 1 |
| `shadow-[inset_0_0_0_0.5px_#00000026,0_2px_14px_#00000038]` | 1 |
| `shadow-[0_2px_4px_rgba(24,8,36,0.35)]` | 1 |
| `shadow-[0px_0px_18.989px_0px_rgba(224,190,96,0.4),0px_0px_5.172px_0px_rgba(0,0,0,0.02),0px_4.234px_8.679px_0px_rgba(0,0,0,0.25)]` | 1 |
| `shadow-[0px_0px_2.737px_rgba(0,0,0,0.02)]` | 1 |
| `shadow-[inset_0_0_0_0.5px_#d2cbba]` | 1 |
| `shadow-[inset_0_1.115px_0_rgba(217,165,94,0.1)]` | 1 |
| `shadow-[0px_4.037px_8.275px_0px_rgba(0,0,0,0.25)]` | 1 |
| `shadow-[inset_0px_0px_20.183px_0px_rgba(108,35,50,0.5)]` | 1 |
| `shadow-[inset_0_0.5px_0_rgba(255,255,255,0.1)]` | 1 |
| `shadow-none` | 1 |
| `shadow-[inset_0.5px_0_0_rgba(255,255,255,0.1)]` | 1 |
| `shadow-[0_0_2px_rgba(0,0,0,0.25)]` | 1 |
| `shadow-[inset_0_0_0_0.5px_#ffb6575c]` | 1 |
| `shadow-[0px_1.35px_1.013px_rgba(0,0,0,0.25)]` | 1 |
| `shadow-[inset_2px_0_0_0_var(--color-gold)]` | 1 |

## Blend modes
| value | count |
|---|---|
| `mix-blend-soft-light` | 3 |
| `mix-blend-luminosity` | 2 |
| `mix-blend-darken` | 1 |

## Transition declarations
| value | count |
|---|---|
| `transition-colors` | 16 |
| `transition` | 8 |
| `transition-opacity` | 7 |
| `transition-none` | 5 |
| `transition-transform` | 3 |

## Max-widths
| value | count |
|---|---|
| `max-w-[1280px]` | 2 |
| `max-w-[310px]` | 1 |
| `max-w-[827px]` | 1 |
| `max-w-[699px]` | 1 |
| `max-w-[650px]` | 1 |
| `max-w-[1030px]` | 1 |
| `max-w-[520px]` | 1 |
| `max-w-[687px]` | 1 |
| `max-w-[595px]` | 1 |
| `max-w-[1245px]` | 1 |

## Gaps
| value | count |
|---|---|
| `gap-8` | 19 |
| `gap-6` | 18 |
| `gap-3` | 16 |
| `gap-2` | 11 |
| `gap-4` | 10 |
| `gap-12` | 9 |
| `gap-5` | 7 |
| `gap-10` | 7 |
| `gap-16` | 6 |
| `gap-1` | 4 |
| `gap-0` | 3 |
| `gap-1.5` | 2 |
| `gap-2.5` | 2 |
| `gap-20` | 1 |

## Breakpoint prefixes
| value | count |
|---|---|
| `lg:` | 156 |
| `md:` | 98 |
| `min-[1200px]:` | 17 |
| `min-[992px]:` | 12 |
| `min-[1440px]:` | 3 |
| `max-[480px]:` | 2 |
| `min-[480px]:` | 2 |
