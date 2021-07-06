export default function animate(ctx) {
    const {renderer, scene, camera, controls, uniforms} = ctx;
    requestAnimationFrame(() => animate(ctx));
    if (ctx === null) {return;}

    // Render scene
    renderer.render(scene, camera);
    controls.update();

    if (ctx.startTime === undefined) {
        ctx.startTime = +new Date();
    } else {
        uniforms.time.value = 1e-3 * (+new Date() - ctx.startTime);
    }
};
