class RestService {
  entity = ``;
  url = `/api`;

  constructor(entity) {
    this.entity = entity;
  }

  getAll = async () => {
    const r = await fetch(`${this.url}/${this.entity}`);
    return await r.json();
  };

  create = async entity => {
    const options = this.getOptions(`post`, entity);
    const r = await fetch(`${this.url}/${this.entity}`, options);
    return await r.json();
  };

  update = async entity => {
    try {
      const r = await fetch(
        `${this.url}/${this.entity}/${entity.id}`,
        this.getOptions(`put`, entity)
      );
      return await r.json();
    } catch (err) {
      console.error(err);
    }
  };

  delete = async entity => {
    try {
      const r = await fetch(
        `${this.url}/${this.entity}/${entity.id}`,
        this.getOptions(`delete`)
      );
      return await { isDeleted: true, id: entity.id, ...r.json() };
    } catch (err) {
      console.error(err);
    }
  };

  getOptions = (method, body = null) => {
    const options = {
      method: method.toUpperCase(),
      headers: {
        "content-type": `application/json`
      }
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    return options;
  };
}
export default RestService;
