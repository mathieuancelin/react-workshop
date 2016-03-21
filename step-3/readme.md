# Etape 3 : SPA et react-router

Maintenant que notre application possède les fonctionnalités de base, nous allons commencer a nous attaquer à la navigation.

En effet pour le moment notre application regroupe toute les foncitonnalités dans une seul et même écran, ce qui s'avère très pratique d'un point de vue technique mais qui n'est pas génial d'un point de vue utilisateur.

Nous allons donc découper notre application en 3 écrans successifs, permettant de choisir la region d'un vin, puis le vin a consulter et enfin la fiche de consultation du vin. Ici chaque sélection entrainera la navigation jusqu'à l'écran suivant, etc ...

Mais comme nous sommes dans un contexte frontend et que nous ne sommes pas la pour coder du backend, nous allons développer tout ca sous forme d'une SPA (single page application).

Une SPA est une application web (front) accessible via une page unique. Le but est d'éviter le chargement d'une nouvelle page à chaque action demandée et donc de fluidifier l'expérience utilisateur.

Il va donc nous falloir un moyen de router l'utilisateur à travers divers écrans.

Un moyen simple pourrait être d'avoir un composant technique au plus haut niveau de notre application pour gérer la navigation. Ce composant gérerait la pile d'appel et la vue courante dans son `state` et proposerai une API pour être piloté depuis les diverses vues.

Par exemple :

```javascript
const Navigator = React.createElement({
  propTypes: {
    initialRoute: React.PropTypes.shape(
      component: React.PropTypes.func.isRequired,
      title: React.PropTypes.string,
      props: React.PropTypes.object,
    ).isRequired,
  },
  getInitialState() {
    return {
      component: null,
      title: null,
      props: null,
    };
  },
  componentDidMount() {
    this.setState({
      component: this.props.initialRoute.component,
      title: this.props.initialRoute.title,
      props: this.props.initialRoute.props,
    });
  },
  navigateTo({ component, title, props }) {
    this.setState({ component, title, props });
  },
  render() {
    const Component = this.state.component;
    const { title, props } = this.state;
    return (
      <Component
        {...props}
        navTitle={title}
        navigator={{ navigateTo: this.navigateTo }} />
    );
  }
});

const Page2 = React.createElement({
  ...
});

const Page1 = React.createElement({
  gotoNext() {
    this.props.navigator.navigateTo({
      title: 'Page 2',
      component: Page2,
      props: {
        foo: 'bar',
      },
    });
  },
  render() {
    return (
      <div>
        <h2>Hello World!</h2>
        <button onClick={this.gotoNext}>Next</button>
      </div>
    );
  }
});

ReactDOM.render(
  <Navigator initialRoute= {{ title: 'Page 1', component: Page1 }} />,
  document.getElementById('main')
);
```
