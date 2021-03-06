import React, { Component } from 'react';
import moment from 'moment';
import api from '../../services/api';
import logo from '../../assets/logo.png';
import { Container, Form } from './styles';
import CompareList from '../../components/CompareList';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  state = {
    repositoryError: false, // verificar se input está com erro
    repositoryInput: '', // estado do input
    repositories: [], // array de repositórios
    loading: false, // variavel de controle de loader
  };

  // quando o componente é montado, verifico se tem repositorios no localStorage
  async componentDidMount() {
    this.setState({ loading: true });
    this.setState({ loading: false, repositories: await this.getLocalRepositories() });
  }

  focus = () => this.textInput.current.focus();

  handleAddRepository = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    const { repositoryInput, repositories } = this.state;

    try {
      const { data: repository } = await api.get(`/repos/${repositoryInput}`);
      // atributo last_commit será a data formatada
      repository.last_commit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositoryError: false,
        repositoryInput: '',
        repositories: [...repositories, repository],
      });

      const localRepositories = await this.getLocalRepositories();

      await localStorage.setItem(
        '@GitCompare:repositories',
        JSON.stringify([...localRepositories, repository]),
      );
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false, repositoryInput: '' });
      this.focus();
    }
  };

  getLocalRepositories = async () => JSON.parse(await localStorage.getItem('@GitCompare:repositories')) || [];

  handleRemoveRepository = async (id) => {
    const { repositories } = this.state;
    const updatedRepositories = repositories.filter(repository => repository.id !== id);
    this.setState({ repositories: updatedRepositories });
    await localStorage.setItem('@GitCompare:repositories', JSON.stringify(updatedRepositories));
  };

  handleUpdateRepository = async (id) => {
    const { repositories } = this.state;
    const repository = repositories.find(repo => repo.id === id);
    // retorna o primeiro repositorio com o id

    try {
      const { data } = await api.get(`/repos/${repository.full_name}`);
      data.last_commit = moment(data.pushed_at).fromNow();
      this.setState({
        repositoryError: false,
        repositoryInput: '',
        repositories: repositories.map(repo => (repo.id === data.id ? data : repo)),
      });
      await localStorage.setItem('@GitCompare:repositories', JSON.stringify(repositories));
    } catch (err) {
      this.setState({ repositoryError: true });
    }
  };

  render() {
    const {
      repositories, repositoryInput, repositoryError, loading,
    } = this.state;

    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form withError={repositoryError} onSubmit={this.handleAddRepository}>
          <input
            ref={this.textInput}
            type="text"
            placeholder="ex: facebook/react"
            value={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
        </Form>

        <CompareList
          repositories={repositories}
          removeRepository={this.handleRemoveRepository}
          updateRepository={this.handleUpdateRepository}
        />
      </Container>
    );
  }
}
