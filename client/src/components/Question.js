import React, { Component } from 'react'
import { Form, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export class Question extends Component {
    constructor(props) {
        super(props);
        const data = props.username;
        if(data)
        {
            this.state = {
                user: data,
            }            
        }
        else
        {
            this.state = {
                user: '',
            }
        }
        this.state = {
            count: 0,
            backgroundImage : this.props.gradient,
            isOpen: false,
            user: this.state.user,
            questionNo: this.props.quesNo,
            index: this.props.index,
            answer: null,            
            questionOptions:
                [
                    {ques:`Add your Own Question`, id: 0},
                    {ques:`Which is ${this.state.user} favourite smartphone brand?`, id: 1},
                    {ques:`Who is ${this.state.user}'s favourite superhero`, id: 2},
                    {ques:`How many kids does ${this.state.user} want ?`, id: 3},
                    {ques:`What is ${this.state.user}'s dream car?`, id: 4},
                    {ques:`What is ${this.state.user}'s favourite show?`, id: 5},
                    {ques:`What is most important for ${this.state.user} ?`, id: 6},
                    {ques:`What does ${this.state.user} use the most ?`, id: 7},
                    {ques:`What type of person is ${this.state.user} ?`, id: 8},
                    {ques:`If ${this.state.user} meets a genie, what would be ${this.state.user}'s wish ?`, id: 9},
                    {ques:`What type of movies does ${this.state.user} like the most?`, id: 10}
                ],
            answerOptions:
                [
                    { id: 0, options: [ { key: 0, option: 'Add an option'} ] },
                    { id: 1, options: [ { key: 0, option: 'Apple'},{ key: 1, option:'Nokia'},{ key: 2, option:'Oneplus'},{ key: 3, option:'Samsung'}] },
                    { id: 2, options: [ { key: 0, option: 'Batman'},{ key: 1, option:'Thor'},{ key: 2, option:'Spider-Man'},{ key: 3, option:'Iron Man'},{ key: 4, option:'Aquaman'}] },
                    { id: 3, options: [ { key: 0, option: 'None'},{ key: 1, option:'One'}, { key: 2, option: 'Two'}, { key: 3, option: 'Three'}, { key: 4, option: 'I want to adopt kids'} ] },
                    { id: 4, options: [ { key: 0, option: 'Audi'},{ key: 1, option:'Jaguar'}, { key: 2, option: 'BMW'}, { key: 3, option: 'Lamborghini'} ] },
                    { id: 5, options: [ { key: 0, option: 'Prison Break'},{ key: 1, option:'Breaking Bad'}, { key: 2, option: 'Game of Thrones'}, { key: 3, option: 'Friends'} ] },
                    { id: 6, options: [ { key: 0, option: 'Money'},{ key: 1, option:'Love'}, { key: 2, option: 'Friends & Family'}, { key: 3, option: 'Career'} ] },
                    { id: 7, options: [ { key: 0, option: 'Whatsapp'},{ key: 1, option:'Facebook'}, { key: 2, option: 'Instagram'}, { key: 3, option: 'Reddit'} ] },
                    { id: 8, options: [ { key: 0, option: 'Funny'},{ key: 1, option:'Cool'}, { key: 2, option: 'Calm'}, { key: 3, option: 'Impatient'} ] },
                    { id: 9, options: [ { key: 0, option: 'Loads of Money'},{ key: 1, option:'Perfect life partner'}, { key: 2, option: 'Perfect job'}, { key: 3, option: 'A huge house'} ] },
                    { id: 10, options: [ { key: 0, option: 'Action'},{ key: 1, option:'Thriller'}, { key: 2, option: 'Comedy'}, { key: 3, option: 'Horror'}, { key: 4, option: 'Drama'}, { key: 5, option: 'Sci-Fi'}, { key: 6, option: 'Romance'} ] },
                ]

        }
      }

    Style = {
        backgroundImage : 'linear-gradient(#FF5F6D, #FFC371)' 
     };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    selectQuestion(index){
        if(index === 0)
        {
            var Ques = this.state.questionOptions;
            Ques.push({ques: 'Add a Question', id: Ques.length});
            var Opts = this.state.answerOptions;
            Opts.push({id: Opts.length, options: [ {key: 0, option: 'Add an option'}]});
            this.setState({
                questionOptions: Ques,
                answerOptions: Opts
            });
            index = Opts.length - 1;
        }
        this.setState({
            index: index,
            answer: null
        });
    }

    removeOption(option){
        var options = this.state.answerOptions[this.state.index].options;
        var newVar = [];
        for(var i = 0; i < options.length; i++)
            if(options[i].key !== option)
                newVar.push(options[i]);
        newVar = {id: Number(this.state.index), options:  newVar};
        var newOptions = [];
        for(var j = 0; j < this.state.answerOptions.length; j++)
        {
            if(this.state.answerOptions[j].id !== this.state.index)
                newOptions.push(this.state.answerOptions[j]);
            else
                newOptions.push(newVar);
        }
        this.setState({
            answerOptions: newOptions
        });
    }

    addOption(){
        var newVar = this.state.answerOptions[this.state.index].options;
        if(newVar.length === 0)
            newVar.push({key: 0, option: 'Add an option'});
        else
            newVar.push({key: Number(Number(newVar[newVar.length - 1].key) + 1), option: 'Add an option'});
        newVar = {id: Number(this.state.index), options:  newVar};
        var newOptions = [];
        for(var i = 0; i < this.state.answerOptions.length; i++)
        {
            if(this.state.answerOptions[i].id !== this.state.index)
                newOptions.push(this.state.answerOptions[i]);
            else
                newOptions.push(newVar);
        }
        this.setState({
            answerOptions: newOptions
        });
    }

    BgChange(color)
    {
        if(color === 'green')
            {
                this.Style = {
                    backgroundImage : 'linear-gradient(#f79d00, #64f38c)' 
                }
                this.setState({
                    backgroundImage: 'green' 
                }) 
            }
        
        if(color === 'voilet')
        {
            this.Style = {
                backgroundImage : 'linear-gradient(#fc00ff, #00dbde)' 
            }
            this.setState({
                backgroundImage: 'voilet' 
            })
        }
        
        if(color === 'indigo')
        {
            this.Style = {
                backgroundImage : 'linear-gradient(#14a1cc, #904e95)' 
            }
            this.setState({
                backgroundImage: 'indigo' 
            }) 
        }
        
        if(color === 'yellow')
        {
            this.Style = {
                backgroundImage : 'linear-gradient(#dbe207, #db36a4)' 
            }
            this.setState({
                backgroundImage: 'yellow' 
            }) 
        }
        
        if(color === 'red')
        {
            this.Style = {
                backgroundImage : 'linear-gradient(#FF5F6D, #FFC371)' 
            }
            this.setState({
                backgroundImage: 'red' 
            }) 
        } 
    }

    qOnChange = e =>{
        var Ques = this.state.questionOptions;
        var newQues = {ques: e.target.value, id: this.state.index};
        var newQuestns = [];
        for(var i = 0; i < Ques.length; i++)
        {
            if(Ques[i].id === this.state.index)
                newQuestns.push(newQues);
            else
                newQuestns.push(Ques[i]);
        }
        this.setState({
            questionOptions: newQuestns
        });
    }

    oOnChange = (e,key) => {
        var options = this.state.answerOptions[this.state.index].options;
        var newOptn = { key: key, option: e.target.value};
        var newVar = [];
        for(var i = 0; i < options.length; i++)
            if(options[i].key !== key)
                newVar.push(options[i]);
            else
                newVar.push(newOptn);
        newVar = {id: Number(this.state.index), options:  newVar};
        var newOptions = [];
        for(var j = 0; j < this.state.answerOptions.length; j++)
        {
            if(this.state.answerOptions[j].id !== this.state.index)
                newOptions.push(this.state.answerOptions[j]);
            else
                newOptions.push(newVar);
        }
        this.setState({
            answerOptions: newOptions
        });
    }

    oOnClick = (e,key) => {
        this.setState({
            answer: key
        });
    }

    componentDidMount(){
        let color = this.props.gradient;
        if(color === 'green')
            {
                this.Style = {
                    backgroundImage : 'linear-gradient(#f79d00, #64f38c)' 
                }
                this.setState({
                    backgroundImage: 'green' 
                }) 
            }
        
        if(color === 'voilet')
        {
            this.Style = {
                backgroundImage : 'linear-gradient(#fc00ff, #00dbde)' 
            }
            this.setState({
                backgroundImage: 'voilet' 
            })
        }
        
        if(color === 'indigo')
        {
            this.Style = {
                backgroundImage : 'linear-gradient(#14a1cc, #904e95)' 
            }
            this.setState({
                backgroundImage: 'indigo' 
            }) 
        }
        
        if(color === 'yellow')
        {
            this.Style = {
                backgroundImage : 'linear-gradient(#dbe207, #db36a4)' 
            }
            this.setState({
                backgroundImage: 'yellow' 
            }) 
        }
        
        if(color === 'red')
        {
            this.Style = {
                backgroundImage : 'linear-gradient(#FF5F6D, #FFC371)' 
            }
            this.setState({
                backgroundImage: 'red' 
            }) 
        }
         
    }

    formChange(){
        setTimeout(function(){
            var ques = this.state.questionOptions[this.state.index];
            var options = this.state.answerOptions[this.state.index];
            var answer = this.state.answer;
            var questionNo = this.state.questionNo;
    
            var QuesData = {
                question: ques,
                options: options,
                answer: answer,
                questionNo: questionNo,
            }
    
            this.props.QuesData(QuesData);
       }.bind(this),500);
    }

    render() {
        return (
            <Form onChange={this.formChange.bind(this)}>
                <div id="question-card" style={this.Style}>
                    <h1 className="question-heading">
                        Question {this.state.questionNo}
                    </h1>
                    <div className="triangle-up"></div>
                    <div className="question-text">
                        <textarea className="form-control" name="question" onChange={this.qOnChange} rows="2" value={this.state.questionOptions[this.state.index].ques} />
                    </div>
                    <Dropdown className="question-suggestion-btn" direction="down" isOpen={this.state.isOpen} toggle={this.toggle} >
                        <DropdownToggle className="question-suggestion-toggle" caret color="white">
                            Load more suggestions 
                        </DropdownToggle>
                        <DropdownMenu className="question-suggestion-dropdown">
                            {this.state.questionOptions.map((todo) => (
                                <DropdownItem key={todo.id} onClick={this.selectQuestion.bind(this, todo.id)} className="suggested-questions">{todo.ques}</DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    <div className="option_enclosure">
                        {
                            this.state.answerOptions[this.state.index].options.map((items) => (
                                <div key={items.key} className="input-group">
                                    <div className="input-group-text">
                                        <label className="radio-container">
                                            <input type="radio" onClick={ (e) => this.oOnClick(e, items.option) } checked={items.option === this.state.answer} className="option-input radio"/>
                                        </label>
                                    </div>
                                        <textarea maxLength="56" spellCheck="false" type="text" onChange={ (e) => this.oOnChange(e, items.key) }  className="form-control textarea-form textarea-form-user" rows="1" cols="60" value={items.option} />
                                    <span className="option_remove_icon" onClick={this.removeOption.bind(this,items.key)}>×</span>
                                </div>
                            ))
                        }
                        <button type="button" className="btn add-button" onClick={this.addOption.bind(this)}>
                            Add an option
                        </button>
                        <div className="theme-button-container">
                            <span className="theme-button theme-button-green" onClick={this.BgChange.bind(this, 'green')}/>
                            <span className="theme-button theme-button-voilet" onClick={this.BgChange.bind(this, 'voilet')}/>
                            <span className="theme-button theme-button-indigo" onClick={this.BgChange.bind(this, 'indigo')}/>
                            <span className="theme-button theme-button-yellow" onClick={this.BgChange.bind(this, 'yellow')}/>
                            <span className="theme-button theme-button-red" onClick={this.BgChange.bind(this, 'red')}/>
                        </div>
                    </div>
                </div>
            </Form>
        )
    }
}

export default Question
