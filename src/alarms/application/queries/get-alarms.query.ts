export class GetAlarmsQuery {
  constructor(
    private readonly sortDirection: string,
    private readonly sort: string,
  ) {}
}
