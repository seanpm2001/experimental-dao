export const idlFactory = ({ IDL }) => {
  const Member = IDL.Record({
    'xp' : IDL.Nat64,
    'principal' : IDL.Principal,
    'username' : IDL.Text,
    'level' : IDL.Nat64,
    'roles' : IDL.Nat64,
  });
  const MemberError = IDL.Variant({
    'PrincipalAlreadyRegistered' : IDL.Null,
    'UsernameExists' : IDL.Null,
  });
  const Result = IDL.Variant({ 'Ok' : IDL.Opt(Member), 'Err' : MemberError });
  const IssueData = IDL.Record({
    'title' : IDL.Text,
    'body' : IDL.Text,
    'state' : IDL.Text,
    'number' : IDL.Nat64,
  });
  const HttpRequest = IDL.Record({
    'url' : IDL.Text,
    'method' : IDL.Text,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)),
  });
  const StreamingStrategy = IDL.Variant({
    'Callback' : IDL.Record({
      'token' : IDL.Record({}),
      'callback' : IDL.Func([], [], ['query']),
    }),
  });
  const HttpResponse = IDL.Record({
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)),
    'streaming_strategy' : IDL.Opt(StreamingStrategy),
    'status_code' : IDL.Nat16,
  });
  return IDL.Service({
    'create_member' : IDL.Func([IDL.Text], [Result], []),
    'get_all_issues' : IDL.Func([], [IDL.Vec(IssueData)], ['query']),
    'get_all_members' : IDL.Func([], [IDL.Vec(Member)], ['query']),
    'http_request' : IDL.Func([HttpRequest], [HttpResponse], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
