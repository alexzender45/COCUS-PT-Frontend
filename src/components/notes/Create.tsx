import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';


export interface IValues {
    title: string,
    description: string,
    id: string,
}

export interface IFormState {
    [key: string]: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}

class Create extends React.Component<RouteComponentProps, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            title: '',
            description: '',
            id: '',
            created_at: '',
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }

    private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        this.setState({ loading: true });

        const generatedCode = JSON.stringify(Math.floor(100000 + Math.random() * 100000));
        const formData = {
            title: this.state.title,
            description: this.state.description,
            id: generatedCode,
            created_at: Date.now()
        }
        // encrypt formdata
        const encryptedData = btoa(JSON.stringify(formData));
        this.setState({ submitSuccess: true, values: [...this.state.values, formData], loading: false });

        localStorage.setItem(generatedCode, encryptedData);
        setTimeout(() => {
                     this.props.history.push('/');
        }, 1500)
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }

    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div>
                <div className={"col-md-12 form-wrapper"}>
                    <h2> Create Note </h2>
                    {!submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            Fill the form below to create a new note
                    </div>
                    )}

                    {submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            The form was successfully submitted!
                            </div>
                    )}

                    <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                        <div className="form-group col-md-12">
                            <label htmlFor="title"> Title </label>
                            <input type="text" id="title" onChange={(e) => this.handleInputChanges(e)} name="title" className="form-control" placeholder="Enter note title" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="description"> Description </label>
                            <input type="text" id="description" onChange={(e) => this.handleInputChanges(e)} name="description" className="form-control" placeholder="Enter Description" />
                        </div>

                        <div className="form-group col-md-4 pull-right">
                            <button className="btn btn-success" type="submit">
                                Create Note
              </button>
                            {loading &&
                                <span className="fa fa-circle-o-notch fa-spin" />
                            }
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Create)
