import {Component,ViewChild,ElementRef} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser'
import {NavController,NavParams,ViewController} from 'ionic-angular'
import { SignaturePad } from 'angular2-signaturepad/signature-pad';


@Component({
  templateUrl:'sign.html',
  selector:'sign',

})

export class SignPage {
  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private viewCtrl:ViewController
  ) {

  }
  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  private signaturePadOptions:any = {
    canvasWidth: 500,
    canvasHeight: 300
  }

  private typeName:string;
  private no:string;
  @ViewChild('head') head:ElementRef;
  @ViewChild('foot') foot:ElementRef;
  ngAfterViewInit() {
    let type=this.navParams.get('type');
    if(type=='order'){
      this.typeName='订单'
    }
    else{
      this.typeName='工单'
    }
    this.no=this.navParams.get('no');
    this.calSignWH();
    let data='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAJICAYAAABMoX5+AAAgAElEQVR4Xu2dfchuWVnGL4tM09SR/jJxnCSMIkczUNJhxkIi00ZLiDAYxU+wdCaUTNKZRCpRGi00/KhRKOlLRkGjRDqaCinRzFT/GOiZKTEj/Eoz7cu4cq9as+d53vfZ3+ve92/D4Zzzvnuvfd+/a+3ruZ+11177bmKDAAQgAIEmCdytyagICgIQgAAEhEHTCSAAAQg0SgCDblQYwoIABCCAQdMHIAABCDRKAINuVBjCggAEIIBB0wcgAAEINEoAg25UGMKCAAQggEHTByAAAQg0SgCDblQYwoIABCCAQdMHIAABCDRKAINuVBjCggAEIIBB0wcgAAEINEoAg25UGMKCAAQggEHTByAAAQg0SgCDblQYwoIABCDQikF/TWJlPbojBCAAgZpAKwbtmGzSFyT9YACJ+EAJIBIhQiA6gZYM+lmS3hykksago/d84odAAAItGXSpoj8h6SGNs3unpLdK8t9sEIAABBYh0JpB2/CupopeRGsahQAEghFozaBLFf02SU9vnCXDHI0LRHgQiE6gRYN+sKSLAapoG/QzuqGO6P2A+CEAgQYJtGjQxnSDpOsbN+kvSrp34zE22OUICQIQOJVAqwbt+H0TruVhjggfIqf2A/aDAAQaJNCyQTeI604hXdXN24Zh60oRHwSCEsBcpgnHjcJp/DgaAhA4gwAGPa17YNDT+HE0BCCAQS/WBzDoxdDSMAQgQAU9rQ9g0NP4cTQEIEAFvVgfwKAXQ0vDEIDAlhW0ze287fPdQyvvqna8h6SvSHpcN1f6A71GbpR03XkNz/R7DHomkDQDAQjclcCWBl1H4ylrfoLQf/zvstmgL5H0OUn3k/R+STboT0v6IUlP3PjbAQbNVQUBCCxGoBWDnjNBm6ara5v50hsGvTRh2odAYgJ7M+gybLJWXhh04ouH1CGwNIG1jGzpPNz+ayW9cOW1MTDoNZTlHBBISmBPBm2zvE3Sw0/Ucg5znaONE8NlNwhAIBuBvRi0Z3V888DqeQ5znaONbH2OfCEAgRMJ7MGgx64fPYe5ztHGiVKxGwQgkI3AHgzaJnmZpNsHijeHuXqmSD0tcGAI7A4BCEDgOIHoBu350V/o5k8P0dnj1LcMHBI51L7XhLZJrzGlb0h+7AsBCOyAQIsGfU31wEqpTj1Do/904BST9UMvNvep+T+56wO83XsHFwMpQKA1AlMNaol8yltUbKI2wCt7J/ls9xShK+BHSLp1ZBBzDHH4A8QfFP4AYYMABCAwK4EWDfqsBMsNQe/jdwLeZwKNOQy6fJj49VxsEIAABGYlEM2gnXx5m/ZNFYmt8ri2q+AZg561W9IYBCBgAlsZ21j6hx7lrlfF8zj1msMNT+gq+Q+OTYjjIAABCBwjEMWgPyPp/pLuOGPGhseCPdXOK+CttfmcHode80Nhrdw4DwQgsDGB1g3aazt7GKHlat/jz2UsemM5OT0EILAnAi0Z9IUO7A9IunsF2Yv1l+lsLbK/2D0o02JsxAQBCAQm0JJB+0abp9T5wRMPGfghkAjbHLNBIuRJjBCAwMoEWjLolVOf7XQY9GwoaQgCEKgJYNDT+wMGPZ0hLUAAAgcIYNDTuwUGPZ0hLUAAAhj0In0Ag14EK41CAAJU0NP7AAY9nSEtQAACVNCL9AEMehGsNAoBCFBBT+8DGPR0hrQAAQhQQS/SBzDoRbDSKAQgQAU9vQ9g0NMZ0gIEIEAFvUgfwKAXwUqjEIAAFfT0PoBBT2dICxCAABX0In0Ag14EK41CAAJU0NP7AAY9nSEtQAACVNCL9AEMehGsNAoBCFBBT+8DGPR0hrQAAQhQQS/SBzDoRbDSKAQgQAU9vQ9g0NMZ0gIEIEAFvUgfwKAXwUqjEIAAFfT0PoBBT2dICxCAABX0In0Ag14EK41CAAJU0NP7AAY9nSEtQAACVNCL9IF/k3TPRVqmUQhAIDUBKujp8lNBT2dICxCAABX0In0Ag14EK41CAAJU0NP7AAY9nSEtQAACVNCL9AEMehGsNAoBCFBBT+8DGPR0hrQAAQhQQS/SBzDoRbDSKAQgQAU9vQ/cIMl/2CAAAQjMSgCDnobz/ZKumtYER0MAAhA4TACDntYzGN6Yxo+jIQCBMwhg0NO6BwY9jR9HQwACGPRifQCDXgwtDUMAAlTQ0/oABj2NH0dDAAJU0Iv1AQx6MbQ0DAEIUEFP6wMY9DR+HA0BCFBBL9YHMOjF0NIwBCBABU0fgAAEINAoAQy6UWEICwIQgAAGTR+AAAQg0CgBDLpRYQgLAhCAAAZNH4AABCDQKAEMulFhCAsCEIAABk0fgAAEINAoAQy6UWEICwIQgAAGTR+AAAQg0CgBDLpRYQgLAhCAAAZNH4AABCDQKAEMulFhCAsCAQk8TNLLJH1J0q2S3iXp9oB5NBMyBt2MFAQCgdAEHi7plgMZvFXSL2HU47TFoMdx4ygIQODOBGzE1xyB4ir6GZL8kmW2AQQw6AGw2BUCEDhKwCZ8affbj0p6qKT7Vnv790/phj7AeCIBDPpEUOwGAQicScBro3v7vKRLJD1Y0jslXd4z6Ud0+4DzBAIY9AmQ2AUCEDiTwP0kfa7b4zZJHo/25p/7ZmGprP0zm7YrabYTCGDQJ0BiFwhA4EwCV0m60O3xAUn+f9kO3Tx8saTXwPR8Ahj0+YzYAwIQOJvA0yXd1O3iGRs39Hb3/6+vfubxaIY6TuhVGPQJkNgFAhA4k8BbJD2z28OzNTyjo9481PGJbmy6/Px1kq6F69kEMGh6CAQgMJXA2yX9VNeIbwr+9YEGbcY39n7um4m+qch2hAAGTdeAAASmEvD85iu7Rs7yFJtxPfXu0HDI1Fh2dTwGvSs5SQYCmxAoBl2m2B0Lol9Feyz6sk0iDnJSDDqIUIQJgYYJeOrc1d3j3OcZbr+K9s1CT8VjO0AAg6ZbQAACUwmUCro/xe5Qu/1Hwq+T9NqpAez1eAx6r8qSFwTWI1Ae8z5lZsaTJd1cheYV7/wzNipo+gAEIDAzAT/SfbFr89AUu0OnK4+F+3enVN0zhxynOSroOFoRKQRaJPAcSW/sAvP48ynrP9ezPjz+7HFoNipo+gAEIDAzgXKD8COSHn1i2/0nCykUj4ADzIk9it0gAIGDBMpwxZCbffXaHW6UB1YwaC4vCEBgZgL1Db9ThzdKCPU49JMkvXvm2HbRHBX0LmQkCQhsQqBMmRtzo++vqrHn50t6wyYZNH5SDLpxgQgPAo0SqNeAPnX2Rp1KvQLeKdPzGsWwbFgY9LJ8aR0CeyVQHtv+Qrcw/9A863WimcnBGPTQ/sP+EIDAGQTKI9tTFjyqH/umWDwAGyhcgxCAwFACU6vncr4yRc//fxxv/b6rDBj00K7J/hCAQHm0e0r1bIr1fOipbe1SFQx6l7KSFAQWI1Cq5zu6l8NOWXCfG4XnyIRBL9aPaRgCuyRQxo3HzNzoAznrZbO7hDc0KQx6KDH2h0BeAq543yTpK5LuMxOG8sDKbV1FPlOz+2gGg96HjmQBgaUJeN7zLZK8et0c1XOJl5kcZyiHQS/drWkfAvsgUMaLXel6aGLK2HNNpF7Zjrer9PoKBr2Pi4csILAkgbp6fookT4+ba/t1ST/bNTZ323PFuFk7GPRm6DkxBMIQ8CupXihpiXHiesElptpRQYe5KE4N1B3cr7L3q4Pm+tp56rnZb/8EPObssWdX0Us8TFK/kWXMoku7VoAKOra89TxSj+W5AvHfbBCYi0Cpnpc0zzKTwwWG14Zm6whg0LG7Qm3QJRMvPOOLioo6trYtRF8WNPKCSP73Ka+zGhM3NwqPUMOgx3Sndo7x107fUfe6vB7mqDdXI++TdJOkP24nZCIJRKAY59LLgdaPfA95M0sglONCxaDHcWvxKHdyP4bbN2rH6rvunrvKGHWLyrUZU/l25urZ48RL9p36iUJ/8/N9FTZJGPS+uoEvJJvx5UfSYhrTvvReKht/M7vY3Ric86GUs+JlHPoAHQx6qS6+Xbu+uP5A0uOPhODxad9MXLIi2i57zjwHgTVuDPbj9L2TUlgMfb/hHDk32QYG3aQsswT13jNM2mPWrozYINAnUE97W9Mo63Hotar25tXHoJuXaFKAHkd0NXRoXJqHAiah3e3BZRH9pW8M9gHW49D0zY4OBr3b6+z/EvP0KF90l/ZS9ZjfK7pF0/dPgQxPIVCq5zVuDPbjqV9Cu+Sc61M4NLMPBt2MFIsG4s5vk76ydxaPQ3tak4c82CBQptVtNcRQ3tTCS2SpoFNejR7ne/mB2TusIpayO9wp6TLEMPdqdUPI1u8opHhkmt2QvrObfeubMSUpV05eZ4EtL4Eyi2KJ9TZOpVr3zTVvUJ4a3+r78Sm1OvImTnjIpJ8t6S1NREcQaxNw9ezq9VOSvnvtk1fne5akN3f/51sdFfSGXXHbUx8ak/6kpCsWXG9h24w5+zEC7gsXurU2tqyeHV9Z+8P/5qEqDDr1Ves79v5aW0/BY6gjX5eo35Rig9xyqw2aqXYY9JZ9sYlz13NPS0BcGE1Is0oQ9SPdW1fPJeHyyPfa87BXAT70JIxBDyW2v/3LY711Zoz/7U/nQxmVexFLvCllLMHyElkWTaKCHtuHdnWcqygPddQPsjAPdVcSH0ymrp5bGu8tc6F5WAWD3v9VeGKGh4Y6qKJPhBd0t/LN6Y5uOdFW0igPy7RU1W/GhiGOzdA3d+L+UAfzUJuTaLaAWq2enWAx6NY+OGaDP6QhDHoIrX3v64vWY5Jl7Q4bNts+CbRaPdcGzfsJGeLY59VHVhA4g0D9lu6t1tw4S6D6/YTpC8j0ALiUIZCMQMvVc11B+9/p/Sk9gGQXJ+nmJlBXz63Ody8LJnnJUw+7pd4w6NTyk3wyAmXec8s34Lz07TXdK9kuSabPXdLFoLP3APLPQqCeudFq9WwtyhAMNwkZ48lybZInBP53hs71krZ4W8oQ/PVKi+kLyPQAhvQc9oVAUAKunm/pHkhpuXo23msl3dhxTu9P6QEEveAIGwJDCBTTa716dk5PlnRzl5zHoD3UkXbDoNNKT+JJCESqni3JYyV9sNMm/dOsGHSSq5Q00xKIVD1bpPJmcf+7lSVQN+s8GPRm6DkxBBYnUL8tpfWx5xpGWRMag168i3ACCEBgKwKleva8Z6+xEmU8txj0dd20u634bX5eKujNJSAACCxCwNXz57qWW1xz46yky3ockar+RUTEoBfBSqMQ2JzAb0p6nqR/lfTAQNWzwRWDTv9WFQx68+uIACAwO4H65auvkvSS2c+wbIPlce/0b1XBoJftaLQOgS0I1Et2RpxLXJ4mTP+4Nwa9xeXDOSGwHIGnS7qpa/5tkvz/aBsPq3SKYdDRui7xQuA4gXpBJO8V9b2S9TsyU0+1w6C53CGwHwL1eyWjj98y1Y7V7PZzZZJJCAJXSHqppP+S9IeSPAQx19Z/M3v0yvNWSZdLSj3Vjgp6rsuDdiBwPoGvSrp7tduc5lMMzc23vCD/+ZS+vkd5s0rqqXYY9Kndhf0gMI1Av8Itrc0xTlwv0el2oz2YcogsU+0Y4ph2xXE0BAYQ6JtoOdSVr0167Fa/Z3Av1bPzqB9Td44pNyromLJ7GtJ9JfnrX5T1FWKSni/q+gbexyU9pGp6ShVdt7uX6tl51FPt0vpU2sTnu+5Wb6me52pz9ljd6yS5EmNrk0C9JrMjfL2k51ehfkTSo0eEXi/Nuafq2bnU60JHfNhmhJx3PQSDngXjqo3UBl2f2E+PedyOqnpVOU462aslvajb0zfwfkzSbdWRX5Z0r5NauvNO5UZa+emeVn+rP3ymfMMYgbWdQzDodrQ4NRJXY77hZKO++shBvnBdUfvPRUl/z1DIqXhn36/+qu7GfQPP+pSV5soJh06Lq9fb2Fv1XJiUudBP6ZjNLk7rDWLQrSt0dnyuMmzUvqHiMemzNpv17Z1pe2jE//bffk8dwyPL9AOb6AVJ/lD19rFuKMPc6/Uy/LuhU+76x+/RxMzJ/XpP3wwG9TQMehCuZne2AdikTzHqY0n4xtV7Jf1TZ97+Co5xj5e8P+7sluoquSwIVM4w5Mm/DNWzuaR/WAWDHn8BtnikTaFU1JfOFKCHRz4k6e+69lzV+MKxobAdJlC/aqrs0V+4qD8vesjKbfVDKW5/j9Wz8yrfEnwT3MVHug2D3q/kHvu8vnvV0RJZ/rukP5H0292NySXOEbFNm/PN3X2CEv+hV071Z2B431Oux/6Ytr/puKLe41YMesi3i11xOKVD7CrhhMnYMHwBu2Lz32U8tKDwWPQDJH1zd+PK+wytvl39eT6uq0S3l3nrz0v2GL9N1WbT38oYa/n5KTcK+2PPpxwTVY8ySwWDjqogcS9CoJj6j0p6pKRvkHTliWfyVD8b9SFDOrGJsLsdmgJ51vBDf6jiPLPtD4vsuXp2JygfdnvP82iHp4IO6wWbBe6v5jYdm8mTzojCRp3pARqbpxfKrx9LPm/2wdBq2DNCfJ6y7XXsueRXbqTuYfGnURcsBj0KGwd1BFxp++u7b+B4achDm7+m2qj2PPRhU/bX8AdVAE55m0l/JsdZFXR/5kaGr/01n5RelTJp7HURAq7sfEEdGwrx48x+eenehj4OTafz05we7jhvnZT+AkpnGXRZ3a2I528v715EyXYarfmk9KqUSbfT/3YZiStqG/WxitqVtMcWbWLRq+pD0+k8u+VRJ84h71fFxwy6/yqrDNWzL456xkrKx70x6F16ZBNJnWfUDtI3ycpNxfOqzSaS6gXRn7HhXw99IrA8zuxjj40p928+ZjGrJ0h6T8c8S8536mIYdIuX/b5i+klJPyLpmjPSKtP0fFMxilH312F2emMqWz8E9JiOzU9L+t0DnOrZHpneMFJ/wzhvhsu+rpouGwx6l7I2mZQNzWOKrqyPzbP+G0kvCDJO3b/B5/nOznHoB0y9It1zJb2pp17/gZZMRlUb9HkzYprs9FODwqCnEuT4MQR84RWzPrTIU4SL8bOSvE5x2ca+ZqoevjiUd32jLON0szIENHToaEy/bO4YDLo5SVIF5OrQleih4Y+W5/j2b+59RtK3jVSufvjk0NQ830gt3zjGfgiMDK2Jw4pBp1yPA4Nuog+mD8Im5Rtu9cyPqe/qWxJqf3hjyriwZ2iUtaH7Bl1/EIwdQlmSwxptlw+oMeP7a8S36Dkw6EXx0vgAAq6mbcr1kIcXYnrmgDbW2rX/JpMp48K1QfeNvp4lcsqDL2vlv+Z5ytOWLX9gL8YDg14MLQ2PINCfTvYpSd8z4sbbiFMPOmToI9rnNV6+xvfXnKiHN1JOM+u92CCdX6VL+Lwrhd9vSsDV5Ke7lfVKIJ4n7bHXlra5DbqsaldXifXwRsabg0Xv+ltEOr9Kl3BLVzmxHCTQH9/1TlOGEJbA3DfoqW+dLpVyXUHXj3ZHmNWyBGe3WfeHy3bw9OkgThj0IFzsvBKB/jrJNkSbdCvbJyV9exXM1Ouo5OsbgWW97prB1A+AVriNiaM26HTDPFM71hjgHAOB8wgMXVf5vPbm/v1XJd29a9QzMO4/8QSlgi6vvarznzJDZGJYTRxezwNv7ZvU4oAw6MURc4KRBPrDCC0ZVb1+xi2Svm9kjuWwOldfk/XNwXSm1GPp4Z1f63527FH4ifjbPRyDbleb7JH13x5iHq2MQdYGPccTbrVBuz2/S9Jb2jeJVJ2/XtGu5YeXFrleMehFsNLoTAT6VfTrJf3MTG2Pbaaet+w25riB159XXWLLXj2bQ23Qc7Aeq/smx2HQm2DnpCcS6L/B+mOSvuvEY5farR/THCbaX7jfsbc0pLMUy1Parb9JpXvUHYM+pYuwz5YELvbe8zeHIU7J58+qGSX1rIspbfZXrMOc/58mBj2lZ3EsBBYm0J/RseUjz/1Fkt4h6akz5W+T/lVJfyvplTO1uYdm6m8sVNB7UJQcdkWgP+ZbpqJtkWR/rPjZkt6yRSCJzlkP/2DQiYQn1TgE+sa4xQML/XHiuYY34qiwTaT1gypbD2+tToAx6NWRc8IRBPrDHGvfzffww4XeWPiWQy0jEIY9BIMOKx2BZyHQH+Z4u6SnrZh8/U7ActpW5mSviGGTU2HQm2DnpBAYRuCLku7dHfJhSY8ddvjovQ89dp7y7R6jCU47sB5a4kGVaSw5uhECnm1wdbfwjm+q+YEPj5n6365GvSi+9/G/y98O3Qb4LZL8vr3/rHIpP/eUt3tVx5Vd/LLXb+zeau25yn77havOObc/kvQTXYNrvV3DbD5YfTD49DzdN6eq57dVP+p96KW657cQeA/GoAOLdyT0Q8t1bpGl15PwzT1Xm/731K1eF3itmRz9m5Nel9nTvub+8JnKZs/HM81uz+omzO2/JbX2wfvPklwB/6kkm9wYg6vNcg2DPjS08WJJr0nYp7ZMuTboOdY92TKXwedu7UIenAAH3InAoQWGhiL6B0kflfSlam3iB3ZDHx7i+I+uQZtkqYzv0a3o5iU4rzzxhD7Wfzz84j8etjhrq2/ULT3M4KEfr1Ln2Rtl4+m+E4Wdebe6T2PQM8OluXUJ9B8Z9tk9JvzQI2HY6Gx85Y+Nco7NVU/5U78E9ry2PZb9W0fGsD8u6Tu6Bvwh8qDzGpvw+3o4xc1kfaP2BISzHVrP4Fnr3sNswU9tiAp6KsH2jj80Jcxv5PBWv63DFfAa2xMl/XhXYV8+4ISurv3aJ8839r8/JOkx3fEfkfToAW0N2fXQh1y62QNDgK2wb1neNd2bvTHoFXrXyqc4NMzR0rQwx2cT9B/PkvDf5xm3K/tvqgzaSJfqu/0lTtNVbSv311NOVxcdS+l+Shyr75Mq2dXpbnfC+oWjjuLL3fS47SI6/8yutL9X0g+fOI69xOPe/RuDHtrwh8gcs1DOJ8AexwjUH5qpHhDCoPd5UXgo41OS7lmlt4ShLUXP8fsBBRvmpUdO4qrKY8W+eTfHcI0red8YLMNAPm26m1JLCTqx3fqeQKr1ODDoiT2n4cP/QtKjqviimo1N2n+OzQ6xOXsKnv/YrMdsNmWvteFquWxLzxQZE2fWY7wM6893yad6LyEGvd8u3/+6Hnma2KE5yceUO2smyKFjbM43S/LYeL1F+sax31789cxqg041Fx2D3m/XPjQbIeJ6uoeGHn6uG/qwcZ8yjc8zQO4v6b1dpV3mXLttm3NdObtHROS035789W9QN3UJrr2S4aZcMehN8S9+8v6MBK+v8aLu8evFTz7DCWycHnqox4X7Qw9j5lz7pt/vSfL0uf4c8VQGMINGazRRL5gUdahuFCcMehS2MAf5a7vHZvtVZlknw3OMxzx2vQYAG6+rptqcPavCPz/2QM0Vkh7ZVcTXjAgScx4BbYVD6goag14BOKdYj4A79xsl+THsQ5sN/Pe7inK9qM4+kxd8+sVuhbx6z6EXZ1mt7/sleUzZD7ocmhXi9UFcpZkFW3sE6vU4WprTvzgpKujFETdxAlfSnqp01gMhrkptgHM97j028UOr8bly9s+dw9TN7diMy7cKPwr/vAbynprXno9Pu2ASBr3nbn3X3GzUrqj997H5xa4ifZNsjrnFQ+j6ht2N3RBGfZxX53tm99j3kPbO29fj2/WCT+ftz++3I0AFvR17zrwRAXf6l3df/Q+F4EqzrIOxdIiOxYskeaZFvblydtXsWNjyEqjHoBniyNsPUmZuc7QBHhr+cIXpx8bnWnS/BuzxYb/1xcMN/WluZT9u2qXskndJmiEO+kFqAjZLVyk26mPziv9S0vu6G46nrk1RFkXyamT1AkmPP2dtEG7ape6Od0meWRz0Bwh0U9o8pOCK5ZQHQPw4+QO6dxja5MuUOP9tUx56j+MfJb1B0itRAwIVgbqCTvWtaugFRK/JQcDVrquWerbDkpmXWRoeTln75uSSedH2PAR4knAejrSyQwK+OJ7VW4t5jjS/IsnrZvwy84/nwLnrNuoKOtXLE6igd92vZ03Owxa+UHxDr9zU88++s3tfYf9kfnehp8h9ulpP2XOsy+u1Th3HnjUJGgtJ4DndvQ8H/1xJbwqZxYigMegR0DjkIIGyGpyHKFp9fBzpYhKggo6pG1FDAAIJCGDQCUQmRQhAICaB+iYhY9AxNSRqCEBgpwSooHcqLGlBAALxCdTrQTMPOr6eZAABCOyIAAa9IzFJBQIQ2BeBegw61evImGa3r45MNhDYIwEMeo+qkhMEILALAr/QPXHqZF4q6Vd2kdUJSVBBnwCJXSAAgU0JeN1yv+3H2/WSXrFpNCueHINeETanggAERhFgiGMUNg6CAAQgsDwBZnEsz5gzQAACEBhFoDbooW92H3XCVg5iiKMVJYgDAhA4RgCDpm9AAAIQaJQABt2oMIQFAQhAAIOmD0AAAhBolEC9WJLfMG/DTrExBp1CZpKEQGgC9TQ7DDq0lAQPAQjsjUD9JOGrJL1kbwkey4cKOovS5AmBuAReLelFXfi/IekFcVMZFjkGPYwXe0MAAusTuKF7xNtnZjW79flzRghAAAJHCbxW0gu737JgPx0FAhCAQEME3i/pyi4e3knYkDCEAgEIQOBWSZd3GB4nyYadYmMMOoXMJAmB0AS+VkV/maTbQ2czIHgMegAsdoUABFYn8GBJF6uzpvKsVMmu3rU4IQQgMJXA0yT9TtfIhyU9dmqDkY7HoCOpRawQyEfAb095WZf2n1c3C1OQwKBTyEySEAhLIO0UOyuGQYfttwQOgRQE0k6xw6BT9G+ShEBoAvUMjkdI8pS7NBsVdBqpSRQC4Qg8XNItVdTp/CpdwuG6KAFDIC+Beh3oOyR5yl2qDYNOJTfJQiAUgXqRpLdJ8rrQqTYMOpXcJAuBUATeKenqLuJUb/MuKmHQoforwUIgFYHPS7pvl3G6G4TOG4NO1d9JFgJhCFwhyQ+mePuXyqjDJDBHoBj0HBRpAwIQmJtA/R7CdH4woLUAAA2oSURBVI94M8Qxd3eiPQhAYE4C9fhzqreo1BCpoOfsUrQFAQjMQaA//znVEqMY9BxdiDYgAIGlCNTV8wckXbXUiVpvlwq6dYWIDwK5CDxB0nuqlFO94qovNQadq/OTLQRaJ/BWSdd0QX5J0re2HvCS8WHQS9KlbQhAYCiBeu7zOyQ9dWgDe9ofg96TmuQCgdgEPNZ8oUoh7eyNwgCDjt2hiR4CeyJQz312Xmlnb2DQe+rW5AKBfRCo357yBUn320da47Oggh7PjiMhAIF5CXgx/su7JlNPr6OCnrdj0RoEIDCNwMMk3VY1cZ0kV9SpNyro1PKTPASaIVAPbzioSyR5RkfqDYNOLT/JQ6AJAn5TysUqkrdLeloTkW0cBAa9sQCcHgIQUP3mbqrnqkNg0FwdEIDAlgTq9w46jtdJunbLgFo6NwbdkhrEAoFcBPoPpnhqnVeyuz0XhuPZYtD0BAhAYAsCNuebe3OdmbnRUwKD3qJrck4IQKA/7vwuSR7uYGMMmj4AAQhsTKC/5rPNOf20ur4mVNAb91JOD4GkBDzWXG4Geg60nyJkY4iDPgABCEAgBgEq6Bg6ESUEIJCQAAadUHRShgAEYhDAoGPoRJQQgEBCAhh0QtFJGQIQiEEAg46hE1FCAAIJCWDQCUUnZQhAIAYBDDqGTkQJAQgkJIBBJxSdlCEAgRgEMOgYOhElBCCQkAAGnVB0UoYABGIQwKBj6ESUEIBAQgIYdELRSRkCEIhBAIOOoRNRQgACCQlg0AlFJ2UIQCAGAQw6hk5ECQEIJCSAQScUnZQhAIEYBDDoGDoRJQQgkJAABp1QdFKGAARiEMCgY+hElBCAQEICGHRC0UkZAhCIQQCDjqETUUIAAgkJYNAJRSdlCEAgBgEMOoZORAkBCCQkgEEnFJ2UIQCBGAQw6Bg6ESUEIJCQAAadUHRShgAEYhDAoGPoRJQQgEBCAhh0QtFJGQIQiEEAg46hE1FCAAIJCWDQCUUnZQhAIAYBDDqGTkQJAQgkJIBBJxSdlCEAgRgEMOgYOhElBCCQkAAGnVB0UoYABGIQwKBj6ESUEIBAQgIYdELRSRkCEIhBAIOOoRNRQgACCQlg0AlFJ2UIQCAGAQw6hk5ECQEIJCSAQScUnZQhAIEYBDDoGDoRJQQgkJAABp1QdFKGAARiEMCgY+hElBCAQEICGHRC0UkZAhCIQQCDjqETUUIAAgkJYNAJRSdlCEAgBgEMOoZORAkBCCQkgEEnFJ2UIQCBGAQw6Bg6ESUEIJCQAAadUHRShgAEYhDAoGPoRJQQgEBCAhh0QtFJGQIQiEEAg46hE1FCAAIJCWDQCUUnZQhAIAYBDDqGTkQJAQgkJIBBJxSdlCEAgRgEMOgYOhElBCCQkAAGnVB0UoYABGIQwKBj6ESUEIBAQgIYdELRSRkCEIhBAIOOoRNRQgACCQlg0AlFJ2UIQCAGAQw6hk5ECQEIJCSAQScUnZQhAIEYBDDoGDoRJQQgkJAABp1QdFKGAARiEMCgY+hElBCAQEICGHRC0UkZAhCIQQCDjqETUUIAAgkJYNAJRSdlCEAgBgEMOoZORAkBCCQkgEEnFJ2UIQCBGAQw6Bg6ESUEIJCQAAadUHRShgAEYhDAoGPoRJQQgEBCAhh0QtFJGQIQiEEAg46hE1FCAAIJCWDQCUUnZQhAIAYBDDqGTkQJAQgkJIBBJxSdlCEAgRgEMOgYOhElBCCQkAAGnVB0UoYABGIQwKBj6ESUEIBAQgIYdELRSRkCEIhBAIOOoRNRQgACCQlg0AlFJ2UIQCAGAQw6hk5ECQEIJCSAQScUnZQhAIEYBDDoGDoRJQQgkJAABp1QdFKGAARiEMCgY+hElBCAQEICGHRC0UkZAhCIQQCDjqETUUIAAgkJYNAJRSdlCEAgBgEMOoZORAkBCCQkgEEnFJ2UIQCBGAQw6Bg6ESUEIJCQAAadUHRShgAEYhDAoGPoRJQQgEBCAhh0QtFJGQIQiEEAg46hE1FCAAIJCWDQCUUnZQhAIAYBDDqGTkQJAQgkJIBBJxSdlCEAgRgEMOgYOhElBCCQkAAGnVB0UoYABGIQwKBj6ESUEIBAQgIYdELRSRkCEIhBAIOOoRNRQgACCQlg0AlFJ2UIQCAGAQw6hk5ECQEIJCSAQScUnZQhAIEYBDDoGDoRJQQgkJAABp1QdFKGAARiEMCgY+hElBCAQEICGHRC0UkZAhCIQQCDjqETUUIAAgkJYNAJRSdlCEAgBgEMOoZORAkBCCQkgEEnFJ2UIQCBGAQw6Bg6ESUEIJCQAAadUHRShgAEYhDAoGPoRJQQgEBCAhh0QtFJGQIQiEEAg46hE1FCAAIJCWDQCUUnZQhAIAYBDDqGTkQJAQgkJIBBJxSdlCEAgRgEMOgYOhElBCCQkAAGnVB0UoYABGIQwKBj6ESUEIBAQgIYdELRSRkCEIhBAIOOoRNRQgACCQlg0AlFJ2UIQCAGAQw6hk5ECQEIJCSAQScUnZQhAIEYBDDoGDoRJQQgkJAABp1QdFKGAARiEMCgY+hElBCAQEICGHRC0UkZAhCIQQCDjqETUUIAAgkJYNAJRSdlCEAgBgEMOoZORAkBCCQkgEEnFJ2UIQCBGAQw6Bg6ESUEIJCQAAadUHRShgAEYhDAoGPoRJQQgEBCAhh0QtFJGQIQiEEAg46hE1FCAAIJCWDQCUUnZQhAIAYBDDqGTkQJAQgkJIBBJxSdlCEAgRgEMOgYOhElBCCQkAAGnVB0UoYABGIQwKBj6ESUEIBAQgIYdELRSRkCEIhBAIOOoRNRQgACCQlg0AlFJ2UIQCAGAQw6hk5ECQEIJCSAQScUnZQhAIEYBDDoGDoRJQQgkJAABp1QdFKGAARiEMCgY+hElBCAQEICGHRC0UkZAhCIQQCDjqETUUIAAgkJYNAJRSdlCEAgBgEMOoZORAkBCCQkgEEnFJ2UIQCBGAQw6Bg6ESUEIJCQAAadUHRShgAEYhDAoGPoRJQQgEBCAhh0QtFJGQIQiEEAg46hE1FCAAIJCWDQCUUnZQhAIAYBDDqGTkQJAQgkJIBBJxSdlCEAgRgEMOgYOhElBCCQkAAGnVB0UoYABGIQwKBj6ESUEIBAQgIYdELRSRkCEIhBAIOOoRNRQgACCQlg0AlFJ2UIQCAGAQw6hk5ECQEIJCSAQScUnZQhAIEYBDDoGDoRJQQgkJAABp1QdFKGAARiEMCgY+hElBCAQEICGHRC0UkZAhCIQQCDjqETUUIAAgkJYNAJRSdlCEAgBgEMOoZORAkBCCQkgEEnFJ2UIQCBGAQw6Bg6ESUEIJCQAAadUHRShgAEYhDAoGPoRJQQgEBCAhh0QtFJGQIQiEEAg46hE1FCAAIJCWDQCUUnZQhAIAYBDDqGTkQJAQgkJIBBJxSdlCEAgRgEMOgYOhElBCCQkAAGnVB0UoYABGIQwKBj6ESUEIBAQgIYdELRSRkCEIhBAIOOoRNRQgACCQlg0AlFJ2UIQCAGAQw6hk5ECQEIJCSAQScUnZQhAIEYBDDoGDoRJQQgkJAABp1QdFKGAARiEMCgY+hElBCAQEICGHRC0UkZAhCIQQCDjqETUUIAAgkJYNAJRSdlCEAgBgEMOoZORAkBCCQkgEEnFJ2UIQCBGAQw6Bg6ESUEIJCQAAadUHRShgAEYhDAoGPoRJQQgEBCAhh0QtFJGQIQiEEAg46hE1FCAAIJCWDQCUUnZQhAIAYBDDqGTkQJAQgkJIBBJxSdlCEAgRgEMOgYOhElBCCQkAAGnVB0UoYABGIQwKBj6ESUEIBAQgIYdELRSRkCEIhBAIOOoRNRQgACCQlg0AlFJ2UIQCAGAQw6hk5ECQEIJCSAQScUnZQhAIEYBDDoGDoRJQQgkJAABp1QdFKGAARiEMCgY+hElBCAQEICGHRC0UkZAhCIQQCDjqETUUIAAgkJYNAJRSdlCEAgBgEMOoZORAkBCCQkgEEnFJ2UIQCBGAQw6Bg6ESUEIJCQAAadUHRShgAEYhDAoGPoRJQQgEBCAhh0QtFJGQIQiEEAg46hE1FCAAIJCWDQCUUnZQhAIAYBDDqGTkQJAQgkJIBBJxSdlCEAgRgEMOgYOhElBCCQkAAGnVB0UoYABGIQwKBj6ESUEIBAQgIYdELRSRkCEIhBAIOOoRNRQgACCQlg0AlFJ2UIQCAGAQw6hk5ECQEIJCSAQScUnZQhAIEYBDDoGDoRJQQgkJAABp1QdFKGAARiEMCgY+hElBCAQEICGHRC0UkZAhCIQQCDjqETUUIAAgkJYNAJRSdlCEAgBgEMOoZORAkBCCQkgEEnFJ2UIQCBGAQw6Bg6ESUEIJCQAAadUHRShgAEYhDAoGPoRJQQgEBCAhh0QtFJGQIQiEEAg46hE1FCAAIJCWDQCUUnZQhAIAYBDDqGTkQJAQgkJIBBJxSdlCEAgRgEMOgYOhElBCCQkAAGnVB0UoYABGIQwKBj6ESUEIBAQgIYdELRSRkCEIhBAIOOoRNRQgACCQlg0AlFJ2UIQCAGAQw6hk5ECQEIJCSAQScUnZQhAIEYBDDoGDoRJQQgkJAABp1QdFKGAARiEMCgY+hElBCAQEICGHRC0UkZAhCIQQCDjqETUUIAAgkJYNAJRSdlCEAgBgEMOoZORAkBCCQkgEEnFJ2UIQCBGAT+Byrw+IUk8S2CAAAAAElFTkSuQmCC'
    this.signaturePad.clear();
    this.signaturePad.fromDataURL(data,{width:this.signaturePadOptions.canvasWidth,height:this.signaturePadOptions.canvasHeight});
  }

  calSignWH(){
    let hAll=window.document.body.clientHeight;
    let wAll=window.document.body.clientWidth;

    let headH=this.head.nativeElement.clientHeight;
    let itemH=this.foot.nativeElement.clientHeight;

    //有些不太稳定，-2
    let h=hAll-itemH-headH-4;

    //this.signaturePadOptions.canvasWidth=wAll;
    //this.signaturePadOptions.canvasHeight=h;

    //console.log(h);
    this.signaturePad.set('canvasWidth',wAll)
    this.signaturePad.set('canvasHeight',h)

    this.signaturePadOptions.canvasWidth=wAll;
    this.signaturePadOptions.canvasHeight=h;

  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }

  clear(){
    this.signaturePad.clear();
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }


}
