export function circularPermutation(arg: any[] | string, n: number = Math.random()*arg.length): any[] {
    if (typeof arg === 'string') {
        arg = arg.split('')
    }
    n = parseInt((n % arg.length).toString())
    return arg.concat(arg).splice(n, arg.length)
}