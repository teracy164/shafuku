import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';
import { Task } from './task.entity';

@Seeder({
  model: Task,
  containsForeignKeys: false,
})
export class SeedTask implements OnSeederInit {
  run() {
    const data: Partial<Task>[] = [
      {
        title: '新人研修担当',
        contents: '新人研修の担当をお願いします\n・スケジュール作成\n・進捗確認',
        rewards: 20000,
        orderer: '総務',
        startDate: '2022/06/01',
        endDate: '2022/06/30',
        numOfRecruit: 3,
      },
      {
        title: '社内報記事執筆',
        contents: '秋号に載せる趣味の記事を執筆お願いします',
        rewards: 3000,
        orderer: '事業計画推進委員会',
        endDate: '2022/09/30',
        numOfRecruit: 3,
      },
      {
        title: '勉強会講師',
        contents: 'セキュリティ勉強会の講師をお願いします。\n資料作成もお願いします',
        rewards: 5000,
        orderer: '技術力向上委員会',
        endDate: '2022/08/30',
        numOfRecruit: 3,
      },
      {
        title: '先輩インタビュー',
        contents: 'XXX社様のインタビューを受けていただきます',
        rewards: 3000,
        orderer: '総務',
        endDate: '2022/10/01',
        numOfRecruit: 2,
      },
    ];
    return data;
  }

  everyone(data) {
    data.created_at = new Date().toISOString();
    data.updated_at = new Date().toISOString();

    return data;
  }
}
