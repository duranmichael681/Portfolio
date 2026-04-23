# Portfolio Verification Checklist

Run after every significant change. Check each item on real devices where noted.

## Hero
- [ ] Orb renders and rotates smoothly
- [ ] Name scrambles and locks in ≤ ~1s
- [ ] Gradient shimmer loops cleanly
- [ ] Aurora drifts with no banding
- [ ] Buttons scroll to #work / #contact
- [ ] Cursor glow follows smoothly on desktop

## Projects
- [ ] Cards reveal on scroll
- [ ] Stat numbers count up on enter, stop on final value
- [ ] Hover: border glows, no flicker
- [ ] Stack chips wrap gracefully on narrow screens

## Experience
- [ ] Timeline nodes glow, line gradient visible
- [ ] Stat phrases render violet and bold
- [ ] Marquee loops seamlessly
- [ ] Rows run in opposite directions at different speeds
- [ ] Marquee pauses on hover (desktop)

## Contact
- [ ] Form focus rings visible
- [ ] Email chip copies with ✓ toast
- [ ] Empty / invalid / valid form submissions behave correctly
- [ ] EmailJS test send reaches inbox
- [ ] LinkedIn / GitHub links open in new tab

## Global
- [ ] Scroll rail fills with scroll position (desktop)
- [ ] Navbar fades in after ~120px scroll
- [ ] Navbar underline tracks active section
- [ ] Anchor links scroll smoothly
- [ ] Section entrance animations fire once only

## Device matrix
- [ ] Desktop Chrome (macOS)
- [ ] Desktop Safari
- [ ] iOS Safari (real device): orb scaled, no cursor glow, form usable
- [ ] Android Chrome: marquee smooth, no jank
- [ ] `prefers-reduced-motion: reduce`: orb static, no scramble, marquee paused
- [ ] WebGL disabled: orb falls back to static gradient

## Performance (Lighthouse, mobile throttled)
- [ ] Performance ≥ 85
- [ ] Accessibility ≥ 95
- [ ] Best Practices ≥ 95
- [ ] SEO ≥ 95
- [ ] CLS < 0.05
- [ ] LCP < 2.5s

## Bundle
- [ ] First Load JS for `/` under 250KB gzip
- [ ] `three` + `@react-three/fiber` not in initial chunk (should only load after orb mounts)
