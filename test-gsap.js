import gsap from 'gsap';

const tl = gsap.timeline({
    onComplete: () => {
        console.log('TIMELINE COMPLETED!');
    }
});

tl.to('.missing-element', { duration: 1, opacity: 1 })
  .to({}, { duration: 1, onComplete: () => console.log('STEP 2 COMPLETED') });
