// @flow
/* eslint no-plusplus: off */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';

const Sequelize = require('sequelize');

type Props = {};
type State = {
  results: Array<string>
};

const Model = Sequelize.Model;
class User extends Model {}


export default class Home extends Component<Props, State> {
  props: Props;

  sqlite: sqlite;

  state: State = {
    results: []
  };

  componentDidMount() {
    // const sqlite3 = sqlite.verbose();
    const sequelize = new Sequelize('db', 'admin', '12345', {
      dialect: 'sqlite',
      dialectModulePath: '@journeyapps/sqlcipher',
      storage: './src/db.sqlite'
    })
    User.init({
      // attributes
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING
        // allowNull defaults to true
      }
    }, {
      sequelize,
      modelName: 'user'
      // options
    });
    sequelize.sync();

    User.create({ firstName: "Jane", lastName: "Doe" }).then(jane => {
      console.log("Jane's auto-generated ID:", jane.id);
    });
    User.findAll({}).then((results) => {
      this.setState({
        results: results.map((e) => e.firstName)
      });
    });
    // this.db.serialize(() => {
    //   this.db.run('CREATE TABLE lorem (info TEXT)');
    //
    //   const stmt = this.db.prepare('INSERT INTO lorem VALUES (?)');
    //   for (let i = 0; i < 10; i++) {
    //     stmt.run(`Ipsum ${i}`);
    //   }
    //   stmt.finalize();
    //
    //   const results = [];
    //
    //   this.db.each('SELECT rowid AS id, info FROM lorem', (err, row) => {
    //     console.log(`${row.id}: ${row.info}`);
    //     results.push(`${row.id}: ${row.info}`);

    //   });
    // });
  }

  componentWillUnmount() {
    // this.db.close();
  }

  render() {
    const { results } = this.state;
    return (
      <div className={styles.container} data-tid="container">
        <h2>Home</h2>
        <Link to={routes.COUNTER}>to Counter</Link>
        {results.map(result => (
          <h4 key={result}>{result}</h4>
        ))}
      </div>
    );
  }
}
