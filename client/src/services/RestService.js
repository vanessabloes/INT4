import delay from '../utils/delay';

const REST_DELAY = parseInt(process.env.REACT_APP_REST_DELAY) || 0;

class RestService {
  entity = ``;
  url = `/api`;

  constructor(entity) {
    this.entity = entity;
  }

  getAll = async () => {
  //  await delay(REST_DELAY);
    const r = await fetch(`${this.url}/${this.entity}`);
    return await r.json();
  };

  getById = async (id, relatedEntityPlural = false) => {
    await delay(REST_DELAY);
    const url = (relatedEntityPlural) ? `${this.url}/${this.entity}/${id}/${relatedEntityPlural}` : `${this.url}/${this.entity}/${id}`;
    const r = await fetch(url);
    if (!r.ok) {
      const error = new Error(r.statusText || r.status);
      error.response = r;
      throw error;
    }
    return await r.json();
  };

  create = async entity => {
   // await delay(REST_DELAY);
    console.log(entity)
    const options = this.getOptions(`post`, entity);
    console.log(options)
    const r = await fetch(`${this.url}/${this.entity}`, options);
    console.log(r)
    return await r.json();
  };

  update = async entity => {
    await delay(REST_DELAY);
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

  updateLinked = async (entity, relatedEntityPlural) => {
    await delay(REST_DELAY);
    try {
      const r = await fetch(
        `${this.url}/${this.entity}/${entity.id}/${relatedEntityPlural}`,
        this.getOptions(`put`, entity)
      );
      return await r.json();
    } catch (err) {
      console.error(err);
    }
  };

  delete = async entity => {
    await delay(REST_DELAY);
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
    console.log(options)
    return options;
  };
}
export default RestService;
