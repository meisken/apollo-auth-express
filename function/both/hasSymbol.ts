function hasSymbol(value: string){
    let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if(format.test(value)){
        return true;
      } else {
        return false;
      }
}

export { hasSymbol }