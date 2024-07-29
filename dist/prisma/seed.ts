import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createCategoriasIfNotExists() {
  const categories = await prisma.spendCategory.findMany();

  if (categories.length === 0) {
    await prisma.spendCategory.createMany({
      data: [
        {
          name: 'Alimentação',
          description: 'Gastos com alimentação',
          color: '#FFB6C1',
        },
        {
          name: 'Transporte',
          description: 'Gastos com transporte',
          color: '#87CEEB',
        },
        {
          name: 'Moradia',
          description: 'Gastos com moradia',
          color: '#FFA07A',
        },
        {
          name: 'Saúde',
          description: 'Gastos com saúde',
          color: '#98FB98',
        },
        {
          name: 'Lazer',
          description: 'Gastos com lazer',
          color: '#FFD700',
        },
        {
          name: 'Educação',
          description: 'Gastos com educação',
          color: '#ADD8E6',
        },
        {
          name: 'Outros',
          description: 'Gastos diversos',
          color: '#D3D3D3',
        },
      ],
    });
  }
}

async function createPrivacyPolicyIfNotExists() {
  const privacyPolicy = await prisma.privacyPolicy.findFirst();

  if (!privacyPolicy) {
    await prisma.privacyPolicy.create({
      data: {
        version: '1.0.0',
        content: `
        ### Privacy Policy

        Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website, https://spend-control-api.herokuapp.com, and other sites we own and operate.

        We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.

        We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorised access, disclosure, copying, use or modification.

        We don’t share any personally identifying information publicly or with third-parties, except when required to by law.

        Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.

        You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.

        Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.

        **This policy is effective as of 1 January 2021.**
        `,
      },
    });
  }
}

async function main() {
  await Promise.all([
    createCategoriasIfNotExists(),
    createPrivacyPolicyIfNotExists(),
  ]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
