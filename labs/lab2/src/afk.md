      <select value={this.state.value} onChange={this.handleChange}>
      {protein.map(name => <option value={name} key = {name}> {name} </option>)}
      </select>