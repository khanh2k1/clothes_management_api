const { DataTypes, Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    'test', 'root', '25032001',
    {
        host: 'localhost',
        port: '3306',
        dialect: 'mysql'
    }
)

// through is required!

// user.addProject(project, { through: { role: 'manager' } });
const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
})

const Project = sequelize.define('Project', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    role: {
        type: DataTypes.STRING,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

UserProject = sequelize.define('user_project', {
    role: Sequelize.STRING
});

User.belongsToMany(Project, { through: UserProject });
Project.belongsToMany(User, { through: UserProject });

console.log('all roles were inserted successfully.');

async function connectMysql() {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
        // await sequelize.sync({ alter: true })
        // await sequelize.sync({ force: false })

        const Project = sequelize.define('project', {
            name: DataTypes.STRING
        });

        const User = sequelize.define('user', {
            name: DataTypes.STRING
        });

        const ProjectUser = sequelize.define('project_user', {
            // Các trường khác (nếu có)
            role: Sequelize.STRING
        });

        User.belongsToMany(Project, { through: ProjectUser });
        Project.belongsToMany(User, { through: ProjectUser });

        sequelize.sync({ force: true })

        const t = await sequelize.transaction();

        try {
            const user = await User.create({ name: 'Dang Khanh' }, { transaction: t });
            const project = await Project.create({ name: 'project1' }, { transaction: t });
            user.addProject(project, { through: { role: 'manager' } }, { transaction: t });

            t.commit();
        } catch (err) {
            await t.rollback();
            throw err;
        }



        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
connectMysql()


