export function circularPermutation(arg, n = Math.random() * arg.length) {
    if (typeof arg === 'string') {
        arg = arg.split('');
    }
    n = parseInt((n % arg.length).toString());
    return arg.concat(arg).splice(n, arg.length);
}
