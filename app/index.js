//一起来使用 Facebook Graph API 开发显示个人图片和用户名的简单 Avatar 组件吧。
var Avatar = React.createClass({
    render: function() {
        return (
            <div>
                <ProfilePic username={this.props.username} />
                <ProfileLink username={this.props.username} />
            </div>
        );
    }
});

var ProfilePic = React.createClass({
    render: function() {
        return (
            <img src={'http://graph.facebook.com/' + this.props.username + '/picture'} />
        );
    }
});

var ProfileLink = React.createClass({
    render: function() {
        return (
            <a href={'http://www.facebook.com/' + this.props.username}>
                {this.props.username}
            </a>
        );
    }
});

React.render(
    <Avatar username="pwh" />,
    document.getElementById('avatar')
);


var names = ['Alice', 'Emily', 'Kate'];

React.render(
    <div>
        {
            names.map(function (name) {
                return <div>Hello, {name}!</div>
            })
        }
    </div>,
    document.getElementById('map')
);

var arr = [
    <h1>Hello world!</h1>,
    <h2>React is awesome</h2>,
];
React.render(
    <div>{arr}</div>,
    document.getElementById('arrhtml')
);


var HelloMessage = React.createClass({
    render: function() {
        return <h1>Hello {this.props.name}</h1>;
    }
});

React.render(
    <HelloMessage name="John" />,
    document.getElementById('example')
);


var NotesList = React.createClass({
    render: function() {
        return (
            <ol>
                {
                    React.Children.map(this.props.children, function (child) {
                        return <li>{child}</li>;
                    })
                }
            </ol>
        );
    }
});

React.render(
    <NotesList>
        <span>hello</span>
        <span>world</span>
    </NotesList>,
    document.getElementById('example')
);

//有时需要从组件获取真实 DOM 的节点，这时就要用到 ref 属性
var MyComponent = React.createClass({
    handleClick: function() {
        this.refs.myTextInput.focus();
    },
    render: function() {
        return (
            <div>
                <input type="text" ref="myTextInput" />
                <input type="button" value="Focus the text input" onClick={this.handleClick} />
            </div>
        );
    }
});

React.render(
    <MyComponent />,
    document.getElementById('example')
);


var Hello = React.createClass({
    getInitialState: function () {
        return {
            opacity: 1.0
        };
    },

    componentDidMount: function () {
        this.timer = setInterval(function () {
            var opacity = this.state.opacity;
            opacity -= .05;
            if (opacity < 0.1) {
                opacity = 1.0;
            }
            this.setState({
                opacity: opacity
            });
        }.bind(this), 100);
    },

    render: function () {
        return (
            <div style={{opacity: this.state.opacity}}>
                Hello {this.props.name}
            </div>
        );
    }
});

React.render(
    <Hello name="world"/>,
    document.body
);

// Ajax
var UserGist = React.createClass({
    getInitialState: function() {
        return {
            username: '',
            lastGistUrl: ''
        };
    },

    componentDidMount: function() {
        $.get(this.props.source, function(result) {
            var lastGist = result[0];
            if (this.isMounted()) {
                this.setState({
                    username: lastGist.owner.login,
                    lastGistUrl: lastGist.html_url
                });
            }
        }.bind(this));
    },

    render: function() {
        return (
            <div>
                {this.state.username}'s last gist is
                <a href={this.state.lastGistUrl}>here</a>.
            </div>
        );
    }
});

React.render(
    <UserGist source="https://api.github.com/users/octocat/gists" />,
    document.body
);



//如果Promise对象正在抓取数据（pending状态），组件显示"正在加载"；如果Promise对象报错（rejected状态），组件显示报错信息；如果Promise对象抓取数据成功（fulfilled状态），组件显示获取的数据。

var RepoList = React.createClass({
    getInitialState: function() {
        return { loading: true, error: null, data: null};
    },

    componentDidMount:function(){
        this.props.promise.then(
                value => this.setState({loading: false, data: value}),
                error => this.setState({loading: false, error: error}));
    },

    render: function() {
        if (this.state.loading) {
            return <span>Loading...</span>;
        }
        else if (this.state.error !== null) {
            return <span>Error: {this.state.error.message}</span>;
        }
        else {
            var repos = this.state.data.items;
            var repoList = repos.map(function (repo) {
                return (
                    <li>
                        <a href={repo.html_url}>{repo.name}</a> ({repo.stargazers_count} stars) <br/> {repo.description}
                    </li>
                );
            });
            return (
                <main>
                    <h1>Most Popular JavaScript Projects in Github</h1>
                    <ol>{repoList}</ol>
                </main>
            );
        }
    }
});

