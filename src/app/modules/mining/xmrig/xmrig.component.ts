import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationService, NotificationStyleType, NotificationType} from '@swimlane/ngx-ui';
import {XmrigService} from '@module/mining/xmrig/xmrig.service';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'lthn-app-xmrig',
  templateUrl: './xmrig.component.html',
  styleUrls: ['./xmrig.component.scss']
})
export class XmrigComponent implements OnInit, OnDestroy {
  public poolInfo: any;
  private sub: Subscription = new Subscription();

  constructor(private xmrig: XmrigService, private notificationService: NotificationService) { }

  public config: any;
  public downloads: any;
  public wallet: string = '';
  public pool: string = 'pool.hashvault.pro';
  public xmrigData = {
    summary: {}
  }

  async ngOnInit() {

    this.config = await this.xmrig.checkInstallConfig()

    if(this.config['wallet']){
      this.wallet = this.config['wallet']
    }
    try{
      this.xmrigData.summary =  await this.xmrig.getData()
      if(this.xmrigData.summary['id'] !== undefined){
        this.sub = interval(3000).subscribe(async () => {
          this.xmrigData.summary =  await this.xmrig.getData()
        });
      }

    }catch (e) {

    }
  }

  public async startXmrig() {
    if(this.wallet.length < 10){
      this.notificationService.create({
        type: NotificationType.html,
        styleType: NotificationStyleType.error,
        title: 'Error',
        body: "Wallet address not set"
      })
      return false;
    }


    let config = this.config

    if(!config['wallet'] || config['wallet'] !== this.wallet){
      config['wallet'] = this.wallet
      config['url'] = this.pool
      await this.xmrig.setInstallConfig(config)
    }



    await this.xmrig.startXmrig({user: this.wallet, url: this.pool})

    this.sub = interval(3000).subscribe(async () => {
      this.xmrigData.summary =  await this.xmrig.getData()
    });

    this.notificationService.create({
      type: NotificationType.html,
      styleType: NotificationStyleType.success,
      title: 'Xmrig started!',
      body: "Make it so"
    })
  }

  async downloadXmrig(id: string) {
    await this.xmrig.downloadXmrig(id)
    this.notificationService.create({
      type: NotificationType.html,
      styleType: NotificationStyleType.success,
      title: 'Download Requested!',
      body: id
    })
  }

  async getHashVaultStats(){
    if(this.wallet.length < 10){
      return false
    }
    const res = await fetch(`https://api.hashvault.pro/v3/lethean/wallet/${this.wallet}/stats?chart=total&inactivityThreshold=10&order=name&period=daily&poolType=false&workers=true`)

    return await res.json()
  }

  public ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe();
  }

  public getNow(){
   // console.log(new Date().getTime() *1000)
    return new Date().getTime()
  }

}
